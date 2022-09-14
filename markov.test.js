const { MarkovMachine } = require("./markov");

describe("test  MarkovMachine ", () => {
  let mm;

  beforeEach(() => {
    mm = new MarkovMachine(
      "I do not like green eggs and ham. I do not like them, Sam-I-am."
    );
  });

  test("test makeChains()", () => {
    expect(mm.chains).toEqual({
      'I': ["do","do"],
      'do': ["not","not"],
      'not': ["like","like"],
      'like': ["green", "them,"],
      'green': ["eggs"],
      'eggs': ["and"],
      'and': ["ham."],
      "ham.": ["I"],
      "them,": ["Sam-I-am."],
      "Sam-I-am.": [null],
    });
  });

  test("test makeText()", () => {
    let text = mm.makeText(10)
    expect(typeof text).toEqual('string');
    text = mm.makeText(20);
    let words = text.split(/[ \r\n]+/);
    expect(words.length).toBeLessThanOrEqual(20);
  });
});
