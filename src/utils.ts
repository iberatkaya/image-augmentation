import isImage from 'is-image';
import fs from 'fs';
import path from 'path';
const fsp = fs.promises;


/**
 * @param {number} n The probability.
 * @returns {boolean} The true or false value of the probability.
 */

export const probabilityFunc = (n: number) => {
   const random = Math.random();
   return random <= n;
}

/**
 * @param {string} dir The directory.
 * @description Check if a directory exists. If it does not, create the directory.
 */

export const createDir = (dir: string) => {
   if (!fs.existsSync(path.join(__dirname, dir))){
      fs.mkdirSync(path.join(__dirname, dir), {recursive: true});
  }
}

/**
 * @param {string} dir The directory.
 * @returns {boolean} Returns true if the path is a directory.
 * @description Check if the path is a directory.
 */

 export const checkIfDir = async (dir: string) => {
   const stat = await fsp.lstat(dir);
   return stat.isDirectory();
}

/**
 * @param {string} dir The directory.
 * @returns All the file paths of the image files in the given directory.
 */

export const allImagesInDir = async (dir: string) => {
   let allfiles = await fsp.readdir(dir);
   let imgfiles = allfiles.filter((x: string) => (isImage(x)));
   let imgfilepaths = imgfiles.map((x: string) => (path.join(__dirname, dir, x)));
   return imgfilepaths;
}