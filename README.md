# ResizeImagesJs
## quickly resize your images in nodejs

#### if you have several images in a single folder that you want to resize quickly this is the solution

##### pre-requisites - there are 2 nodejs dependencies to install

run these commands to set that up

```
npm i sharp
npm i image-size
```
place the index.js file in the same directory as your images and run
node index.js

only files with these extensions will be resized, which you can change<br>
```javascript
const fileTypes = ['.jpg', '.jpeg', '.png', '.gif', '.tif', '.svg'];
```
in index.js modify the ```start()``` function according to how you want to resize your images<br>
below are a few examples which cover most scenarios

```javascript
//1st parameter is the folder name where your modified images go, 2nd is the size ratio
console.log('creating files 75% of original size');
await update('75_percent_' + Date.now(), .75);

console.log('creating files 50% of original size');
await update('50_percent_' + Date.now(), .5);

console.log('creating files 25% of original size');
await update('25_percent_' + Date.now(), .25);
```
