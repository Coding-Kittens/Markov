/** Textual markov chain generator */

function randomRange(min, max) {
  let isrand = false;
  let num = 0;
  while (!isrand) {
    num = Math.floor(Math.random() * max);
    isrand = num >= min;
  }
  return num;
}



class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
   this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {

let words = new Set(this.words);
words = Array.from(words);

 this.chains = words.reduce((obj,word)=>{

let nextWords =[];
for(let i=0;i<this.words.length;i++){

if(this.words[i]===word)
{
if(i+1 < this.words.length){
nextWords.push(this.words[i+1]);
}
else
{
  nextWords.push(null);
}

}


}

 obj[word] = nextWords;
 return obj;
},{});


  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let text =[];
    for(let i =0; i<numWords;i++){
      if(text.length >0){
        let nextWords = this.chains[text[text.length-1]];
        let word = nextWords[randomRange(0,nextWords.length)];
        if(word){
            text.push(word);
        }
        else{
          break;
        }
      }else{
        let word;
        while(!word || this.chains[word].includes(null))
        {
        word = this.words[randomRange(0,this.words.length)];
        }

        text.push(this.words[randomRange(0,this.words.length)]);
      }
    }
    return text.join(' ');
  }

}



module.exports ={MarkovMachine};
