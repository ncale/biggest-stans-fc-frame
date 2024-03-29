import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL, NEYNAR_API_KEY } from '../../../utils/config';
import runStanQuery from '@/src/utils/duneApi';
import { makeSvg, convertToPng } from '@/src/utils/satoriSvg';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  
  let userInput: string | undefined = '';
  let stanUsernames: string[] = [];
  let stanTotalReactions: number[] = [];
  let svg: string = '';
  let pngPath: string = '';
  
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: NEYNAR_API_KEY });


  
  if (isValid) {
    // Assign a username value
    if (message?.input) {
      userInput = message.input;
    } else {
      userInput = 'vitalik.eth';
    };
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
    // Convert to PNG
    pngPath = convertToPng(svg);
  };
  

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Search again?',
        },
      ],
      image: pngPath,
      post_url: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  console.log("Message received a POST request... returned a response")
  return await getResponse(req);
}

export const dynamic = 'force-dynamic';