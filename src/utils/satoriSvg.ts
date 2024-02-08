import { NEXT_PUBLIC_URL, SVG_FONT_PATH } from './config';
import satori, { SatoriOptions } from 'satori';
import SvgMarkup from '@/src/components/SvgMarkup';
import { promises as fs } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

async function getFontData(relativePath: string): Promise<ArrayBuffer> {
  try {
    /*
    // Create path
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const fontPath = path.resolve(__dirname, relativePath);
    */
    // Read file
    const data = await fs.readFile(`${NEXT_PUBLIC_URL}/inter.ttf`);
    // Create and return array buffer
    const arrayBuffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
    return arrayBuffer;
  } catch (err) {
    console.error('Error reading file:', err);
    throw err;
  }
};

async function makeSvg(username: string, stanUsernames: string[], stanTotalReactions: number[]): Promise<string> {
    const tsx = SvgMarkup(username, stanUsernames, stanTotalReactions);
    const fontData = await getFontData(SVG_FONT_PATH);
    const options: SatoriOptions = {
        width: 1200,
        height: 628,
        fonts: [{name: 'Inter', data: fontData}]
    }
    const svg = await satori(tsx, options);
    return svg;
};

export default makeSvg;