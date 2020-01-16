import isImage from 'is-image';
import fs from 'fs';
import appRoot from 'app-root-path';
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
   if (!fs.existsSync(path.join(appRoot.path, dir))){
      fs.mkdirSync(path.join(appRoot.path, dir), {recursive: true});
  }
}

/**
 * @param {string} dir The directory.
 * @returns {boolean} Returns true if the path is a directory.
 * @description Check if the path is a directory.
 */

 export const checkIfDir = async (dir: string) => {
   await createDir(dir);
   const stat = await fsp.lstat(path.join(appRoot.path, dir));
   return stat.isDirectory();
}

/**
 * @param {string} dir The directory.
 * @returns All the file paths of the image files in the given directory.
 */

export const allImagesInDir = async (dir: string) => {
   let allfiles = await fsp.readdir(path.join(appRoot.path, dir));
   let imgfiles = allfiles.filter((x: string) => (isImage(x)));
   let imgfilepaths = imgfiles.map((x: string) => (path.join(appRoot.path, dir, x)));
   return imgfilepaths;
}