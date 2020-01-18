# Image Augmentation

Image augmentation package primarily used for machine learning.

[![NPM](https://nodei.co/npm/image-augmentation.png)](https://nodei.co/npm/image-augmentation/)

Image Augmentation is an image augmentation tool primarily used in machine learning. It is inspired by the [Augmentor](https://github.com/mdbloice/Augmentor) library in Python. Increase the amount of images in your dataset. Have some randomness by selecting a probability for each operation. The default value for the probability of all operations are 0.5. Check out the [API documentation](https://iberatkaya.github.io/image-augmentation/)!


## Install

```sh
npm i image-augmentation
```
## Examples
```javascript
import { ImageAugmentation } from 'image-augmentation';
//or
const { ImageAugmentation } = require('image-augmentation');

/**
 * Create an instance of the class.
*/
let ia = new ImageAugmentation();

/**
 * Makes each images in the current directory grey 
 * with each having a probability of 0.4.
 */
ia.makeGrey({
   probability: 0.4,
   image: './'
});

/**
 * Makes the test.jpg image rotate 120 degrees grey 
 * with a probability 0.2
 */

ia.rotate({
   probability: 0.2,
   rotationDegree: 120,
   image: 'test.jpg'
});

/**
 * Adds a 120px padding to the top each images in the current directory 
 * with each having a probability 0.4. The added pixel's color is blue.
 */

ia.addPadding({
   probability: 0.4,
   amount: 120,
   background: { b: 255, g: 0, r: 0 },
   padding: 'top',
   image: './'
});


/**
 * Resizes 10 images in the data directory to 280x280.
 */

ia.executeMultiple({
   execute: async () => {
      const image = './data';
      await ia.resize({width: 280, height: 280, image, probability: 1});
   },
   outputNumber: 10
});

/**
 * Accomplishes the exact operation as the function above except the
 * output size will be equal to all the images in the data directory.
 */

ia.resize({
   height: 280,
   width: 280,
   probability: 1,
   image: './data'
});

/**
 * Make images in the data directory either grey, flip by the x axis, 
 * or flip by the y axis determined by their probabilities until
 * 10 images are generated.
 */

ia.executeMultiple({
   execute: async () => {
      const image = './data';
      await ia.makeGrey({ image, probability: 0.05 });
      await ia.flipX({ image, probability: 0.5 });
      await ia.flipY({ image, probability: 0.2 });
   },
   outputNumber: 10
});

```

## Author

👤 **Ibrahim Berat Kaya**

* Github: [@iberatkaya](https://github.com/iberatkaya)
* LinkedIn: [@linkedin.com/in/ibrahim-berat-kaya/](https://linkedin.com/in/ibrahim-berat-kaya/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check the [issues page](https://github.com/iberatkaya/image-augmentation/issues). 

## Show your support

Give a ⭐️ if this project helped you!