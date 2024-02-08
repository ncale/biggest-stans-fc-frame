import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../../utils/config';
import runStanQuery from '@/src/utils/duneApi';
import makeSvg from '@/src/utils/satoriSvg';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  
  let userInput: string | undefined = '';
  let stanUsernames: string[] = [];
  let stanTotalReactions: number[] = [];
  let svg: string = '';
  
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    // Assign a username value
    userInput = message?.input ? message.input : 'vitalik.eth';
    // Check if username exists
    // ...
    // Call API
    const stans = await runStanQuery(userInput, 5);
    // Unpack query
    stans.forEach((stan) => {
      stanUsernames.push(stan.username);
      stanTotalReactions.push(stan.comments_from + stan.likes_from + stan.recasts_from);
    })
    // Create SVG using the stan list
    svg = await makeSvg(userInput, stanUsernames, stanTotalReactions);
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Search again?',
        },
      ],
      image: svg,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';