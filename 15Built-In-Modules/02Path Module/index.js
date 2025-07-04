// const path = require('path');

// const filePath = '/users/john/docs/report.pdf';
// console.log(path.basename(filePath));

// path.basename
// path.dirname
// path.extname
// path.parse
// path.join
// path.resolve



const express = require("express");
const app = express();
const path = require('path')




app.get('/', (req, res) => {
  const filePath = './users/hammad/docs/report.pdf'

  console.log("BaseName:" + path.basename(filePath));   //use terminal
  console.log("DirName:" + path.dirname(filePath));
  console.log("ExtName:" + path.extname(filePath));
  console.log(path.parse(filePath));

  
// const fullPath = path.join(__dirname, 'public', 'images', 'avatar.jpg')      //join jo ha wo absolute path bhi bana sakta ha or relative bhi pr resolve only absolute bana skta ha
// console.log(fullPath)


// const fullPath = path.join('public', 'images', 'avatar.jpg')      //this is relative above is absolute
// console.log(fullPath)


const absolutePath = path.resolve('public', 'images.jpg')
console.log(absolutePath)

res.send("Path Module")
})




app.listen(4000, (req, res) => {
  console.log(`Successfully Connected http://localhost:${4000}`);
});
