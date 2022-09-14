/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const {MarkovMachine} = require("./markov");
let textForMm ='';
let numOfTexts =0;
let filePath = null;


//reads a file returns the text from that file
function readTxt(path){
fs.readFile(path,'utf8',(e,data)=>{
if(e){
  console.log(`Error reading ${path}:\n ${e}`);
  process.exit(1);
}
addText(data);

})
}

//gets text from a url and returns it
async function getTxtFromUrl(url) {
try {
  res = await axios.get(url);
  addText(res.data);
} catch (e) {
  console.log(`Error fetching ${url}:\n ${e}`);
  process.exit(1);
}
}

//writes data to a file
function writeFile(path, data) {
  fs.writeFile(path, data, "utf8", (e) => {
    if (e) {
      console.log(`Couldn't write to ${path}:\n ${e}`);
      process.exit(1);
    }
  });
}


let webRegex = /http:/;
let num =10;
let startNum =2;

//checks if there is word limit
if(process.argv[2] === '--num'){
  try {
  num = parseInt(process.argv[3]);
  startNum =4;
  } catch (e) {
      console.log(`Error, ${process.argv[2]} could not be turned into a number, if you have any special charaters or letters in your number please try again with out them. \n ${e}`);
      process.exit(1);
  }
}

//checks if there is any text not in a file or from a url
if(process.argv[startNum] === '--txt'){
  startNum++;
  try {
  if(startNum+1 >= process.argv.length){
      text = process.argv[startNum]
      mm = new MarkovMachine(text);
      console.log(mm.makeText(numWords=num));

  }else{
  textForMm += process.argv[startNum];
  }

  } catch (e) {
    console.log(e);
  }
  startNum++;
}


//checks if it should write to a new file
if(process.argv[startNum] === '--new')
{
startNum++;
try {
filePath = process.argv[startNum];
} catch (e) {
console.log(e);
}
startNum++;
}

//goes through the rest of the arguments and adds the text from the files/urls
for(let i=startNum;i<process.argv.length;i++)
{
  if(webRegex.test(process.argv[i]))
  {
  getTxtFromUrl(process.argv[i])
  }

  else{
    readTxt(process.argv[i])
  }
}


//adds text and if there are no more arguments generates the random text from that
function addText(text){
textForMm+=text;
numOfTexts++;
try {
  if(numOfTexts>=process.argv.length-startNum){
   mm = new MarkovMachine(textForMm);
   text = mm.makeText(numWords=num);
   if(filePath){
     writeFile(filePath,text);
   }else{
    console.log(text);
   }
  }
} catch (e) {
  console.log(`Could not generate text:\n ${e}`);
  process.exit(1);
}

}
