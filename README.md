
This randomly generates text from what text you give it.

It randomly chooses a starting word.
Then keeps choosing random words from a list of words that come after the current word.
It stops when it reaches the word limit or when there is no more words after the current one.



- You can put in a file name or a url to get random text from them:
(No argument "file" or "url" so that you can use both as the text at the same time, and have as many as you want)
  * ```node makeText.js eggs.txt```
  * ```node makeText.js http://www.gutenberg.org/files/11/11-0.txt```


- You can have multiple files and or urls:
   * ```node makeText.js eggs.txt http://www.gutenberg.org/files/11/11-0.txt```


- You can add the amount of max words you would like with '--num':
   * ``` node makeText.js --num 30 eggs.txt```


- You can add text thats not in a file with '--txt':
   * ``` node makeText.js --txt 'the quick brown fox jumped over the lazy dog'```


- You can save the text to a file with '--new':
   * ```node makeText.js --new newEggs.txt eggs.txt```


- Everything together:
if you want to have --num, --txt, and/or --new they have to be in this order: 
   * --num 10  
   * --txt 'text' 
   * --new fileName.txt
     * ``` node makeText.js --num 30 --txt 'the quick brown fox jumped over the lazy dog' --new newText.txt eggs.txt http://www.gutenberg.org/files/11/11-0.txt```
