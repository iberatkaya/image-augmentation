import isImage from 'is-image';
import fs from 'fs';
const fsp = fs.promises;

export const probabilityFunc = (n: number) => {
   const random = Math.random();
   return random <= n;
}

export const createDir = (dir: string) => {
   if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
}

export const checkIfDir = async (dir: string) => {
   const stat = await fsp.lstat(dir);
   return stat.isDirectory();
}

export const allImagesInDir = async (dir: string) => {
   let allfiles = await fsp.readdir(dir);
   let imgfiles = allfiles.filter((x: string) => (isImage(x)));
   let imgfilepaths = imgfiles.map((x: string) => (dir + x));
   return imgfilepaths;
}