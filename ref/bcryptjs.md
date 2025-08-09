
# bcrypt 

### Information
  - bcrypt is the process of hashing the password wid some salt.
  - since adding salt to password it will produce unique hash even the password will same.
  - every bcrypt hashing will give same length of hashed value.
  - **format** :
  \$2<a/b/x/y>\$[cost]$[22 character salt][31 character hash]
    - \$2a$: The hash algorithm identifier (bcrypt)
    - 12: Input cost (212 i.e. 4096 rounds)
    - R9h/cIPz0gi.URNNX3kh2O: A base-64 encoding of the input salt
    - PST9/PgBkqquzi.Ss7KIUgO2t0jWMUW: A base-64 encoding of the first 23 bytes of the computed 24 byte hash

### Steps
  - install bcryptjs dependency
  - import bcryptjs in project
  - define salt round (default 10)
  - generate salt using bcrypt.genSalt(saltRound) method
  - hash the password using bcrypt.hash(plain_pass, salt) method
  - to compare the password wid hashed password using bcrypt.compare(plain_pass, hashed_pass)

 **Note:** *Each method is return promise so either use **await** or **.then()*** 

### Sample code 

```javascript
// import 
const bcrypt = require("bcryptjs");
// to hash
const saltRound = 10;
const salt = await genSalt(saltRound);
const hashedPassword = await bcrypt.hash(password, salt);
// to compare
const passCheck = await bcrypt.compare(password, hashedPassword)
```









