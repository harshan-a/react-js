### Express Security Best Practices

- 'helmet' -- enhance security by setting various HTTP headers;
  ``` Javascript
  const helmet = require("helmet");
  app.use(helmet());
  ```

- 'express-xss-sanitizer' or 'xss-clean' -- sanitize the user input such as req.body, req.params, req.query, req.header and so on to prevent from cross-site-scripting(xss). But this xss-clean lib is no longer supported, so we use express-xss-sanitizer;
  ```javascript
  // xss-clean module;
  const xss = require("xss-clean");
  app.use(xss());

  // express-xss-sanitizer module;
  const {xss} = require("express-xss-sanitizer");
  app.use(xss());
  ```

- 'cors' -- allow server-to-server communication;
  ```js
  const cors = require("cors");
  // allow all other server;
  app.use(cors());
  // allow specific server;
  app.use(cors({
    origin: "origin to access ex: http://localhost:4000"
  })) 
  // specify server dynamically;
  const origins = ["origin1", "origin2"];
  app.use(cors({
    origin: function(origin, callBack) {
      if(origins.includes(origin) || !origin) {
        // callback(err, origin's value)
        // origin's value also be true or false
        // like callBack(null, true);
        callBack(null, origin);
      } // or
      if(origins.indexOf(origin) !== -1 || !origin) {
        // callback(err, origin's value)
        // origin's value also be true or false
        // like callBack(null, true);
        callBack(null, origin);
      }
      else {
        callBack(new Error("Not allowed by CORS"));
      }
    }
  }))
  ```

- 'express-rate-limit' -- control the number of req from same IP by time, prevent abuse, such as brute-force attacks and Denial-of-Service (DoS) attacks,
  ```js
  const rateLimiter = require("express-rate-limit");
  app.use(rateLimiter({
    windowMS: 10 * 60 * 1000, // 10 min
    max: 5, // allow only 5 req for each IP within 10min;
  }));
  // this will limit all the route
  // therefore best practice is to use in specific route
  const limiter = rateLimiter({
    windowMS: 10 * 60 * 1000, // 10 min
    max: 5, // allow only 5 req for each IP within 10min;
  });
  app.use("/api/v1/auth/", limiter, authRouter);
  ```