import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  
  let text: string | undefined = '';
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    text = message?.input ? message.input : 'vitalik.eth';
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