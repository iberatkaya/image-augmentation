import sharp from 'sharp';
import path from 'path';
import appRoot from 'app-root-path';
import { probabilityFunc, createDir, checkIfDir, allImagesInDir } from './utils';


export interface DefaultInterface {
   probability?: number,
   image: Buffer | string,
   output?: string
}

export interface CropInterface extends DefaultInterface{
   width: number,
   height: number
}

export interface RotationInterface extends DefaultInterface {
   rotationDegree: number,
}

export interface PaddingInterface extends DefaultInterface {
   padding: "left" | "right" | "top" | "bottom",
   amount: number,
   background: { r: number, g: number, b: number },
}

export interface MultipleInterface {
   execute: () => Promise<void>,
   outputNumber: number,
   output?: string
}


export class ImageAugmentation {

   private __ctr = 1;
   private __amount = Infinity;
   private multiple = false;

   private __utils = () => {
      let incCtr = () =>{ this.__ctr++; } 
      let decCtr = () =>{ this.__ctr--; } 
      let getCtr = () =>{ return this.__ctr; }
      let setCtr = (a: number) => { this.__ctr = a; }
      let setAmount = (a: number) =>{ this.__amount = a; } 
      let getAmount = () =>{ return this.__amount; } 
      return {
         incCtr, getCtr, decCtr, setAmount, getAmount, setCtr
      }
   }

   private templateFunc = async (func: (image: string | Buffer, imagename: string) => any, probability: number, image: Buffer | string, output: string) => {
      try {
         if(!this.multiple){
            this.__utils().setCtr(1);
            this.__utils().setAmount(Infinity);
         }
         if (probability > 1)
            throw Error("Probability cannot be greater than 1.");
         else if (probability < 0)
            throw Error("Probability cannot be less than 0.");
         if (this.__utils().getAmount() < this.__utils().getCtr())
            return;
         createDir(output);
         let isDir: boolean;
         if (typeof image === 'string') {
            isDir = await checkIfDir(image as string);
         }
         else
            isDir = false
         if (!isDir) {
            if (probabilityFunc(probability)) {
               let imagename = this.__utils().getCtr().toString() + '.jpg';
               this.__utils().incCtr();
               await func(image, imagename);
            }
         }
         else {
            let files = await allImagesInDir(image as string);
            if(files.length === 0)
               throw("No images were found.");
            for (let i = 0; i < files.length; i++) {
               if (this.__utils().getAmount() < this.__utils().getCtr())
                  return;
               if (probabilityFunc(probability)) {
                  let imagename = this.__utils().getCtr().toString() + '.jpg';
                  this.__utils().incCtr();
                  await func(files[i], imagename);
               }
            }
         }
      } catch (e) {
         console.log(e);
         throw(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring.
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory.
    * @description Select a probability and the image or directory. The grey images will be saved to the output directory.
    */

   public makeGrey = async ({ probability = 0.5, image, output = "./output" }: DefaultInterface) => {
      try {
         await this.templateFunc(async (image: string | Buffer, imagename: string) => { await sharp(image).removeAlpha().greyscale().toFile(path.join(appRoot.path, output, imagename)); }, probability, image, output);
      } catch (e) {
         console.log(e);
         throw(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring
    * @param {number} rotationDegree The degree of rotation.
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory.
    * @description Select a probability and the image or directory. The rotated images will be saved to the output directory.
    * @example Rotation degree 90 will rotate the image right.
    */

   public rotate = async ({ rotationDegree, probability = 0.5, image, output = "./output" }: RotationInterface) => {
      try {
         await this.templateFunc(async (image: string | Buffer, imagename: string) => { await sharp(image).removeAlpha().rotate(rotationDegree).toFile(path.join(appRoot.path, output, imagename)); }, probability, image, output);
      } catch (e) {
         console.log(e);
         throw(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring.
    * @param {number} rotationDegree The degree of rotation.
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory.
    * @description Select a probability and the image or directory. The rotated images will be saved to the output directory.
    * @example Rotation degree 90 will rotate the image right.
    */

   public rotateRight = async ({ rotationDegree, probability = 0.5, image, output = "./output" }: RotationInterface) => {
      try {
         await this.templateFunc(async (image: string | Buffer, imagename: string) => { await sharp(image).removeAlpha().rotate(rotationDegree).toFile(path.join(appRoot.path, output, imagename)); }, probability, image, output);
      } catch (e) {
         console.log(e);
         throw(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring.
    * @param {number} rotationDegree The degree of rotation.
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory.
    * @description Select a probability and the image or directory. The rotated images will be saved to the output directory.
    * @example Rotation degree 90 will rotate the image left.
    */

   public rotateLeft = async ({ rotationDegree, probability = 0.5, image, output = "./output" }: RotationInterface) => {
      try {
         await this.templateFunc(async (image: string | Buffer, imagename: string) => { await sharp(image).removeAlpha().rotate(rotationDegree - 180).toFile(path.join(appRoot.path, output, imagename)); }, probability, image, output);
      } catch (e) {
         console.log(e);
         throw(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring.
    * @param {"left" | "top" | "right" | "bottom"} padding The direction of where the padding should be applied.
    * @param {number} amount The amount of padding.
    * @param {{r: number, g: number, b: number}} background The color of the padded pixels.
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory.
    * @description Select a probability and the image or directory. The modified images will be saved to the output directory.
    * @example padding="top", amount=10, background={r: 255, g: 255, b: 255} will add 10 white pixels to the top of the image.
    */


   public addPadding = async ({ padding, amount, background, probability = 0.5, image, output = "./output" }: PaddingInterface) => {
      try {
         let extendobj = { bottom: 0, top: 0, left: 0, right: 0, background: { r: 0, g: 0, b: 0, alpha: 1 } } as { [key: string]: number | object };
         if (padding === "bottom" || padding === "right" || padding === "top" || padding === "left")
            extendobj[padding] = amount;
         extendobj.background = { ...background, alpha: 1 }
         await this.templateFunc(async (image: string | Buffer, imagename: string) => { await sharp(image).removeAlpha().extend(extendobj).toFile(path.join(appRoot.path, output, imagename)); }, probability, image, output);
      } catch (e) {
         console.log(e);
         throw(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring.
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory.
    * @description Select a probability and the image or directory. The flipped images will be saved to the output directory.
    */

   public flipX = async ({ probability = 0.5, image, output = "./output" }: DefaultInterface) => {
      try {
         await this.templateFunc(async (image: string | Buffer, imagename: string) => { await sharp(image).flop().removeAlpha().toFile(path.join(appRoot.path, output, imagename)); }, probability, image, output);
      } catch (e) {
         console.log(e);
      }
   }

   /**
    * @param {number} [probability = 0.5] The probability of the function occuring.
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory.
    * @description Select a probability and the image or directory. The flipped images will be saved to the output directory.
    */

   public flipY = async ({ probability = 0.5, image, output = "./output" }: DefaultInterface) => {
      try {
         await this.templateFunc(async (image: string | Buffer, imagename: string) => { await sharp(image).flip().removeAlpha().toFile(path.join(appRoot.path, output, imagename)); }, probability, image, output);
      } catch (e) {
         console.log(e);
         throw(e);
      }
   }

   /**
    * @param {number} width The new width of the image.
    * @param {number} height The new height of the image.
    * @param {number} [probability = 0.5] The probability of the function occuring.
    * @param {string | Buffer} image The path or the Buffer of the image. If the given path is a directory, all images in that directory will be augmenated.
    * @param {string} [output = "./output"] The output folder in the current directory.
    * @description Select a probability and the image or directory. The resized images will be saved to the output directory.
    */

   public resize = async ({ width, height, probability = 0.5, image, output = "./output" }: CropInterface) => {
      try {
         await this.templateFunc(async (image: string | Buffer, imagename: string) => { await sharp(image).resize({width, height, fit: 'fill'}).removeAlpha().toFile(path.join(appRoot.path, output, imagename)); }, probability, image, output);
      } catch (e) {
         console.log(e);
         throw(e);
      }
   }

   /**
    * @param {async () => {}} execute The function in which the member functions of the class should be called.
    * @param {string} outputNumber The number of images desired.
    * @description Select the member functions and the amount of images desired. The functions will be executed until there is the output is equal to the amount of desired images.
    */

   public executeMultiple = async ({ execute, outputNumber }: MultipleInterface) => {
      try{
         this.__utils().setAmount(outputNumber);
         this.__utils().setCtr(1);
         this.multiple = true;
         while (this.__utils().getCtr() <= this.__utils().getAmount()) {
            await execute();
            process.stdout.write('\rGenerating: ' + ((this.__utils().getCtr()-1) / this.__utils().getAmount() * 100).toFixed(0) + "%");
         }
         process.stdout.write('\n');
         this.multiple = false;
      } catch(e){
         this.multiple = false;
         console.log(e);
         throw(e);
      }
   }
}