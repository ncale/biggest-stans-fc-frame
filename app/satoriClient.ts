import { SVG_FONT_URL } from './config';
import satori, { SatoriOptions } from 'satori';
import SvgMarkup from '@/app/SvgMarkup';
import fetch from 'node-fetch';

async function getFontArrayBuffer(fontUrl: string): Promise<ArrayBuffer> {
  const response = await fetch(fontUrl);
  return response.arrayBuffer();
};

async function makeSvg(username: string, stanUsernames: string[], stanTotalReactions: number[]): Promise<string> {
    const tsx = SvgMarkup(username, stanUsernames, stanTotalReactions);
    const fontArrayBuffer = await getFontArrayBuffer(SVG_FONT_URL);
    const options: SatoriOptions = {
        width: 600,
        height: 400,
        fonts: [{name: 'Inter', data: fontArrayBuffer}]
    }
    const svg = await satori(tsx, options);
    return svg;
};

export default makeSvg;