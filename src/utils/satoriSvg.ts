import { SVG_FONT_URL } from './config';
import satori, { SatoriOptions } from 'satori';
import SvgMarkup from '@/src/components/SvgMarkup';
import { promises as fs } from 'fs';

async function getFontData(fontPath: string): Promise<ArrayBuffer> {
  try {
    const data = await fs.readFile(fontPath);
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    return arrayBuffer;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err;
  }
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