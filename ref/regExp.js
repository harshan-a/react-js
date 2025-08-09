/*
  regex is a pattern used to search a data from text;
  take entire string and find the match;

  syntax for regex: /pattern/modifiers
  modifier = {
    i: case insensitive match,
    g: gobal match(find all),
    m: multiline match
  }

  pattern = {
    abc : {
      matches 'abc' in the string, even in the word.
      example: "hello world".match(/el/g)  return: ["el"];
    },

    ^abc : {
      matches beginning of the string.
      example: "hello world".match(/^wo/g) return: [];
      example: "hello world".match(/^he/g) return: ["he"];
    },

    abc$ : {
      matches ending of the string.
      example: "hello world".match(/o$/g) return: [];
      example: "hello world".match(/d$/g) return: ["d"];
    },

    . : {
      match any char(single) except newline(char).
      example: "hello ".match(/./g) return: ['h', 'e', 'l', 'l', 'o', ' '];
      example: "hello 
                hi ".match(/./g) return: ['h', 'e', 'l', 'l', 'o', 'h', 'i', ' '];
      example: "hello world".match(/.llo/g) return: ["ello"];
    },

    \w : {
      matches any alpha-numeric char and underscore.
      example: "!hello, h_i!3".match(/\w/g) return: ['h', 'e', 'l', 'l', 'o', 'h', '_', 'i', '3']
    },
    \W : {
      matches any non alpha-numeric char and underscore.
      example: "!hello, h_i3!".match(/\W/g) return: ['!', ',', ' ', '!']
    },

    \d : {
      matches any digits char.
      example: "hello1 world!_23".match(/\d/g) return: ['1', '2', '3']
    },
    \D : {
      matches any non-digits char.
      example: "hello1 world!_23".match(/\D/g) return: ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!', '_']
    }

    \s : {
      matches whitespace.
      example: "hello1 h_i! 23".match(/\s/g) return: [' ', ' '];
    },
    \S : {
      matches non-whitespace.
      example: "hello1 h_i! 23".match(/\S/g) return: "hello1h_i!23".split("");
    },

    \b : word boundry (after and before of \w, and it select nothing only pointing to position),
    \B : non-word boundry,

    [abc] : {
      (character set) matches any char in the set. [abc] similar to [a | b | c]
      example: "hello, world!".match(/[hlo]/g) return: ['h', 'l', 'l', 'o', 'o', 'l'];
    },
    [a-z] : {
      (range character set) matches any char in the set.
      example: "hello, world!".match(/[a-e]/g) return: ['e', 'd'];
    },
    [^abc] : {
      (negative character set) matches any char not in the set.
      example: "hello, world!".match(/[hlo]/g) return: ['e', ',', ' ', 'w', 'r', 'd', '!'];
    }

    \ : {
      escaped special characters. (\*, \., \+, \\, etc)
      example: "hello, world.".match(/\./g) return: ['.'];
    }

    (abc) : {
      capture group. Group specific pattern. The matches of each group will be accessed separately. Name it using syntax: /(?<GroupName>pattern)/g
      example: "hello world".match(/(llo)/g) return: ["llo"];
    },
    (?:abc) : {
      not capturing group. The matches does not accessed separately. Otherwise same as capture group.
    }


    a* : matches 0 or more 'a' (0, a, aaa, aaaa..).
    a+ : matches 1 or more 'a' (a, aaa, aaaa..).
    a? : matches 0 or 1 'a'.

    | : or operator. (a|b) matches either a or b.

    a{min, max} : {
      a{1,} : minimum 1 to more 'a',
      a{1, 5} : minimum 1 to maximum 5 'a', 
      a{1} : exactly 1 'a',
      a{0, 5} : 0 t0 5 'a'
    }
  }

  js method that takes the regex as parameter are : {
    String.search(regex) : return index value where the first match.

    String.replace(regex, replaceValue or callback) : find matches and replace with the value or callback returned value.

    String.match(regex) : return an object with some data if regex is not include 'g' flag, else return array of matches.
  } 

  regexp is a object which include : {
    regex.test(String) : return boolean value based on matches.
    
    regex.exec(String) : returns the matches as an object.
  }


*/