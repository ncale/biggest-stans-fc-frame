import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, DUNE_QUERY_ID, DUNE_API_KEY } from '../../config';
import { DuneClient, QueryParameter } from '@cowprotocol/ts-dune-client';

async function queryDune(queryId: number, parameters: QueryParameter[]) {
    const client = new DuneClient(DUNE_API_KEY ?? "");
    const response = await client.refresh(queryId, parameters)
    console.log(response.result?.rows);
};

async function getResponse(req: NextRequest): Promise<NextResponse> {
  
  let text: string | undefined = '';
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
    const something = await queryDune(DUNE_QUERY_ID, params);
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Search again?',
        },
      ],
      image: `${NEXT_PUBLIC_URL}/...`, // <- need to add a picture
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';