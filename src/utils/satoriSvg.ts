import { SVG_FONT_URL } from './config';
import satori, { SatoriOptions } from 'satori';
import SvgMarkup from '@/src/components/SvgMarkup';
import fetch from 'node-fetch';

async function getFontData(fontPath: string): Promise<ArrayBuffer> {
  const response = await fetch(new URL(fontPath, import.meta.url));
  return response.arrayBuffer();
};

async function makeSvg(username: string, stanUsernames: string[], stanTotalReactions: number[]): Promise<string> {
    const tsx = SvgMarkup(username, stanUsernames, stanTotalReactions);
    const fontData = await getFontData(SVG_FONT_URL);
    const options: SatoriOptions = {
        width: 1200,
        height: 628,
        fonts: [{name: 'Inter', data: fontData}]
    }
    const svg = await satori(tsx, options);
    return svg;
};

export default makeSvg;