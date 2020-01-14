import sharp from 'sharp';
import { probabilityFunc, createDir, checkIfDir, allImagesInDir } from './utils';


interface GreyInterface {
   probability?: number,
   image: Buffer | string,
   output?: string
}

interface RotationInterface {
   rotationDegree: number,
   probability?: number,
   image: Buffer | string,
   output?: string
}

interface PaddingInterface {
   padding: "left" | "right" | "top" | "bottom",
   amount: number,
   background: { r: number, g: number, b: number },
   probability?: number,
   image: Buffer | string,
   output?: string
}

export default class ImageAugmentation {

   static ctr = 0;

   private static templateFunc = async (func: (image: string | Buffer, imagename: string) => any, probability: number, image: Buffer | string, output: string) => {
      try {
         if (probability > 1) {
            throw Error("Probability cannot be greater than 1.");
         }
         createDir(output);
         let isDir = await checkIfDir(output);
         if (!isDir) {
            if (probabilityFunc(probability)) {
               let imagename = ImageAugmentation.ctr.toString() + '.jpg';
               ImageAugmentation.ctr++;
               func(image, imagename);
            }
         }
         else {
            let files = await allImagesInDir(image as string);
            for (let i = 0; i < files.length; i++) {
               if (probabilityFunc(probability)) {
                  let imagename = ImageAugmentation.ctr.toString() + '.jpg';
                  ImageAugmentation.ctr++;
                  func(files[i], imagename);
               }
            }
         }
      } catch (e) {
         console.log(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory
    * @description Select a probability and the image or directory. The modified images will be saved to the output directory.
    */

   static makeGrey = async ({ probability = 1, image, output = __dirname + '/output' }: GreyInterface) => {
      try {
         await ImageAugmentation.templateFunc(async (image: string | Buffer, imagename: string) => { sharp(image).removeAlpha().greyscale().toFile(output + '/' + imagename); }, probability, image, output);
      } catch (e) {
         console.log(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring
    * @param {number} rotationDegree The degree of rotation
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory
    * @description Select a probability and the image or directory. The modified images will be saved to the output directory.
    * @example Rotation degree 90 will rotate the image right.
    */

   static rotate = async ({ rotationDegree, probability = 1, image, output = __dirname + '/output' }: RotationInterface) => {
      try {
         await ImageAugmentation.templateFunc(async (image: string | Buffer, imagename: string) => { sharp(image).removeAlpha().rotate(rotationDegree).toFile(output + '/' + imagename); }, probability, image, output);
      } catch (e) {
         console.log(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring
    * @param {number} rotationDegree The degree of rotation
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory
    * @description Select a probability and the image or directory. The modified images will be saved to the output directory.
    * @example Rotation degree 90 will rotate the image right.
    */

   static rotateRight = async ({ rotationDegree, probability = 1, image, output = __dirname + '/output' }: RotationInterface) => {
      try {
         await ImageAugmentation.templateFunc(async (image: string | Buffer, imagename: string) => { sharp(image).removeAlpha().rotate(rotationDegree).toFile(output + '/' + imagename); }, probability, image, output);
      } catch (e) {
         console.log(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring
    * @param {number} rotationDegree The degree of rotation
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory
    * @description Select a probability and the image or directory. The modified images will be saved to the output directory.
    * @example Rotation degree 90 will rotate the image left.
    */

   static rotateLeft = async ({ rotationDegree, probability = 1, image, output = __dirname + '/output' }: RotationInterface) => {
      try {
         await ImageAugmentation.templateFunc(async (image: string | Buffer, imagename: string) => { sharp(image).removeAlpha().rotate(rotationDegree - 180).toFile(output + '/' + imagename); }, probability, image, output);
      } catch (e) {
         console.log(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring
    * @param {"left" | "top" | "right" | "bottom"} padding The direction of where the padding should be applied
    * @param {number} amount The amount of padding
    * @param {{r: number, g: number, b: number}} background The color of the padded pixels
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory
    * @description Select a probability and the image or directory. The modified images will be saved to the output directory.
    * @example padding="top", amount=10, background={r: 255, g: 255, b: 255} will add 10 white pixels to the top of the image.
    */


   static addPadding = async ({ padding, amount, background, probability = 1, image, output = __dirname + '/output' }: PaddingInterface) => {
      try {
         let extendobj = { bottom: 0, top: 0, left: 0, right: 0, background: { r: 0, g: 0, b: 0, alpha: 1 } } as { [key: string]: number | object };
         if (padding === "bottom" || padding === "right" || padding === "top" || padding === "left")
            extendobj[padding] = amount;
         extendobj.background = { ...background, alpha: 1 }
         await ImageAugmentation.templateFunc(async (image: string | Buffer, imagename: string) => { sharp(image).removeAlpha().extend(extendobj).toFile(output + '/' + imagename); }, probability, image, output);
      } catch (e) {
         console.log(e);
      }
   }
}