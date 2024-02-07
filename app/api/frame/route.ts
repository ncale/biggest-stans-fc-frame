import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, DUNE_QUERY_ID, DUNE_API_KEY } from '../../config';
import { DuneClient, QueryParameter } from '@cowprotocol/ts-dune-client';
import makeSvg from '@/app/satoriClient';

async function queryDune(queryId: number, parameters: QueryParameter[]) {
    const client = new DuneClient(DUNE_API_KEY ?? "");
    const response = await client.refresh(queryId, parameters);
    return response.result?.rows;
};

function unpackStanQuery(stans: Record<string, string | number>[]) { // <- need to add dune object type
    let stanUsernames: string[] = [];
    let stanTotalReactions: number[] = [];
    for (const stan of stans) {
        stanUsernames.push(stan.username);
        stanTotalReactions.push(stan.comments_from + stan.likes_from + stan.recasts_from);
    };
    return [stanUsernames, stanTotalReactions];
};

async function getResponse(req: NextRequest): Promise<NextResponse> {
  
  let text: string | undefined = '';
  let stanUsernames: string[] = [];
  let stanTotalReactions: number[] = [];
  let svg: string = '';
  
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    // Assign a username value
    text = message?.input ? message.input : 'vitalik.eth';
    // Check if username exists
    // ...
    // Create Dune params using user input
    const params = [
        QueryParameter.text('user_input_fname', text),
        QueryParameter.number('num_results_to_return', 5),
    ];
    // Call API
    const stans = await queryDune(DUNE_QUERY_ID, params);
    // Unpack query
    [stanUsernames, stanTotalReactions] = unpackStanQuery(stans);
    // Create SVG using the stan list
    svg = await makeSvg(text, stanUsernames, stanTotalReactions);
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Search again?',
        },
      ],
      image: svg, // <- need to add a picture
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';