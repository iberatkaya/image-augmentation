<h1 align="center">Image Augmentation</h1>

[![npm version](https://badge.fury.io/js/image-augmentation.svg)](https://badge.fury.io/js/image-augmentation)

Image Augmentation is an image augemntation tool primarily used in machine learning. It is inspired by the [Augmentor](https://github.com/mdbloice/Augmentor) library in Python. Increase the amount of images in your dataset. Have some randomness by selecting a probability for each operation. The default value for the probability of all operations are 0.5.


## Install

```sh
npm i image-augmentation
```
## Examples
```javascript
import ImageAugmentation from 'image-augmentation;

/**
 * Makes each images in the current directory grey with each having a probability of 0.4
 */
ImageAugmentation.makeGrey({
   probability: 0.4,
   image: '/'
});

/**
 * Makes the test.jpg image rotate 120 degrees grey with a probability 0.2
 */

ImageAugmentation.rotate({
   probability: 0.2,
   rotationDegree: 120,
   image: 'test.jpg'
});

/**
 * Adds a 120px padding to the top each images in the current directory with each having a probability 0.4. The added pixels color is blue.
 */

ImageAugmentation.addPadding({
   probability: 0.4
   amount: 120,
   background: { b: 255, g: 0, r: 0 },
   padding: 'top',
   image: '/'
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