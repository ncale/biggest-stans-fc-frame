import { SVG_FONT_URL } from './config';
import satori, { SatoriOptions } from 'satori';
import SvgMarkup from '@/src/components/SvgMarkup';
import { openAsBlob } from 'fs';

async function getFontArrayBuffer(fontUrl: string): Promise<ArrayBuffer> {
  const blob = await openAsBlob(fontUrl);
  return blob.arrayBuffer();
};

async function makeSvg(username: string, stanUsernames: string[], stanTotalReactions: number[]): Promise<string> {
    const tsx = SvgMarkup(username, stanUsernames, stanTotalReactions);
    const fontArrayBuffer = await getFontArrayBuffer(SVG_FONT_URL);
    const options: SatoriOptions = {
        width: 1200,
        height: 628,
        fonts: [{name: 'Inter', data: fontArrayBuffer}]
    }
    const svg = await satori(tsx, options);
    return svg;
};

export default makeSvg;