import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [{label: 'Find stans'}],
  image: `${NEXT_PUBLIC_URL}/...`, // <- need to add a picture
  input: {text: 'e.g. vitalik.eth'},
  post_url: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: "Biggest Stans Farcaster Frame",
  description: "Farcaster frame of a given users biggest stans",
  openGraph: {
    title: "Biggest Stans Farcaster Frame",
    description: "Farcaster frame of a given users biggest stans",
    images: [`${NEXT_PUBLIC_URL}/...`], // <- need to add a picture
  },
  other: {
    ...frameMetadata,
  },
};

export default function Home() {
  return (
    <>
    </>
  );
}
