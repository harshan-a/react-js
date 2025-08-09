const mongoose = require("mongoose");

const hsnCodeRegex = /(\d{2})[-\.\s]?(\d{2})[-\.\s]?(\d{2})[-\.\s]?(\d{2})[-\.\s]?(\d{2})/;

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "Product name is required"],
//     trim: true
//   },
//   hsnCode: {
//     type: Number,
//     validate: {
//       validator: function(v) {
//         return hsnCodeRegex.test(v);
//       },
//       message: props => `${props.value} is not valid HSN code!`
//     },
//     required: [true, "HSN code required"]
//   },
//   price: {
//     type: Number,
//     required: [true, "Product price is required"]
//   },
//   featured: {
//     type: Boolean,
//     default: false
//   },
//   rating: {
//     type: Number,
//     default: 0
//   },
//   createdAt: {
//     type: Date,
//     required: true,
//     default: Date.now()
//   },
//   company: {
//     type: String,
//     required: true,
//     // enum is used to set the only values accepted in this property
//     // enum: ["ikea", "marcos", "liddy", "caressa"]
//     // also:
//     enum: {
//       values: ["ikea", "liddy", "caressa", "marcos"],
//       message: "Company does not accept"
//     }
//   }
// })

const discountSchema = new mongoose.Schema({
  _id: false,
  percentage: {
    type: Number,
    required: [true, "Discount percentage is required"],
    min: [1, "Discount must be greater then 0"],
    max: [100, "Discount must be less then 100"]
  },
  valid_until: {
    type: Date,
    validate: {
      validator: function(date) {
        const now = new Date();
        const newDate = now.setMinutes(now.getMinutes() + 30);
        return date >= newDate;
      },
      message: props => props.value.toLocaleString() + " Discount valid date is invalid"
    },
  }
})

const ratingSchema = new mongoose.Schema({
  _id: false,
  user_rating: {
    type: [Number],
    validate: {
      validator: function(val) {
        return val.every(num => num >= 0 && num <= 5); // every return true if each elem return true else return false;
      },
      message: "Each rating must be between 0 and 5"
    },
  },
  average: {
    type: Number,
    default: function(val) {
      let totalRate = 0;
      let avg = 0;
      if(this.user_rating.length > 0) {
        this.user_rating.forEach(r => {
          totalRate += r;
        });
        avg = (totalRate / this.user_rating.length).toFixed(2);
      }
      return avg;
    },
    min: [0, "Rating avg must >= 0"],
    max: [5, "Rating avg must <= 5"],
  }
})

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Product name is required"],
    select: true,
    // match: /last$/igm
    // uppercase: true
  },
  
  images: {
    type: [String],
    set: arr => arr.map(elem => elem.trim()),
    // required: [true, "Product image is required"],
    validate: {
      validator: function(val) {
        return val.length > 0;
      },
      message: props => props.value + ", Image array contains atleast 1 path"
    }
  },

  price: {
    type: Number,
    required: [true, "Product price is required"],
    validate: [
      {
        validator: function(val) {
          return val > 0;
        },
        message: props => props.value + ", Price must be greater then 0"
      },
      {
        validator: function(val) {
          return val <= this.MRP;
        },
        message: props => props.value + ", Price must be less then or equal to MRP",
      }
    ], //or
    // min: [1, "Price must be greater then 0"],
  },

  costPrice: {
    type: Number,
    required: [true, "Cost price is required"],
    validate: {
      validator: function(val) {
        return val >= 0;
      },
      message: props => props.value + "Cost price must be greater then or equal to 0"
    }, //or
    // min: [0, "Cost price must be greater then or equal to 0"],
    select: false,
  },

  discount: discountSchema,
  
  company: {
    type: String,
    trim: true,
    required: [true, "Company is required"],
    enum: {
      values: ["ikea", "marcos", "liddy", "caressa"],
      message: "{VALUE}, Company is not accepted"
    },
    minLength: 3,
    maxLength: [20, "Company length do not exceed 20"],
  },

  category: {
    type: String,
    trim: true,
    required: [true, "Category is required"],
  },

  MRP: {
    type: Number,
    required: [true, "MRP is required"],
    validate: {
      validator: function(val) {
        return val > 0;
      },
      message: props => props.value + " MRP must be greater then 0",
    }
  },

  discription: {
    type: String,
    trim: true,
    required: [true, "Product discription is required"],
    minLength: [20, "Discribe the product with about 20 letters"],
  },

  ratings: ratingSchema,

  createdAt: {
    type: Date,
    default: new Date(),
    select: false,
    // date field has expires option, where the value is in seconds like (3600s for 1 hour), this will automatically delete the document after 1 hour. if it is in subdoc it will be ignored.
    // MongoDB runs a background task every ~60 seconds to delete expired docs.
  },

  inStock: {
    type: Boolean,
    required: [true, "Stock availability is required"],
    default: function(val) {
      return this.stockQuantity > 0;
    }
  },

  stockQuantity: {
    type: Number,
    // required: [true, "Stock quantity is required"],
    default: 0,
    validate: {
      validator: function(val) {
        return val >= 0;
      },
      message: props => props.value + "Stock Quantity must be >= 0"
    }
  },

  HSN_CODE: {
    type: Number,
    required: [true, "HSN number is required"],
    validate: {
      validator: function(val) {
        return hsnCodeRegex.test(val);
      },
      message: props => props.value + ", HSN number is invalid"
    },
    select: false
  },

  GST_RATE: {
    type: Number,
    required: [true, "GST rate is required"],
    enum: {
      values: [0, 5, 12, 18, 28],
      message: "GST rate is invalid"
    },
    select: false
  },

  keywords: {
    type: [String],
    set: arr => arr.map(elem => elem.trim()),
  }
})

const Product = mongoose.model("product", schema);

// let dp = {
//   $cond: {
//     if: {$gte: ["$price", 100]}, 
//     then: {$multiply: ["$price", 0.5]}, 
//     else: {$multiply: ["$price", 0.75]}
//   }
// };

// Product.find({
  
//   // comparison operators;
  
//   // ? get the documents which has name of wooden desk ->
//   // name: {$eq: "wooden desk"},
//   // name: "wooden desk",
//   // ? get the doc where id is 684da5adec3897b54df0a289 ->
//   // _id: {$eq: "684da5adec3897b54df0a289"}
//   // _id: "684da5adec3897b54df0a289"
//   // ? get all docs except the doc where name is "wooden desk" -> 
//   // name: {$ne: "wooden desk"}
//   // ? get all docs except the doc where id is "684da5adec3897b54df0a289" -> 
//   // _id : {$ne: "684da5adec3897b54df0a289"}
//   // ? get the docs where the name is "wooden desk" or "wooden bed" or "wooden table" -> 
//   // name: {$in: ["wooden desk", "wooden bed", "wooden table"]} 
//   // ? get the docs where the name isn't "wooden desk" or "wooden bed" or "wooden table" -> 
//   // name: {$nin: ["wooden desk", "wooden bed", "wooden table"]}
//   // ? get all docs where price less then 30 -> 
//   // price: {$lt: 30}
//   // ? get all docs where price less then and equal to 30 -> 
//   // price: {$lte: 30}
//   // ? get all docs where price greater then 30 -> 
//   // price: {$gt: 30}
//   // ? get all docs where price greater then and equal to 30 -> 
//   // price: {$gte: 30}

//   // Logical operators

//   // ? get all docs where price is less then 30 and featured is false ->
//   // $and: [{price: {$lt: 30}}, {featured: {$eq: false}}]
//   // price: {$lt: 30}, featured: false
//   // ? get all docs where either price is less then 30 or featured is false ->
//   // $or: [{price: {$lt: 30}}, {featured: false}]
//   // ? get all docs where neither price is less then 30 nor featured is false -> 
//   // $nor: [{price: {$lt: 30}}, {featured: false}]
//   // ? get all docs where rating not less then 2 includes the docs where there is no featured property or featured is null ->
//   // rating: {$not: {$lt: 2}}
//   // rating: {$gte: 2} //it does not include the null rating

//   // Element operators

//   // ? get the doc which have the rating property ->
//   // rating: {$exists: true}
//   // ? get the doc where the rating type is double
//   // rating: {$type: "double"}
//   // ? get the doc where the rating type is either double or int
//   // rating: {$type: ["double", "int"]}

//   // Evaluate operators

//   // ? get the doc where the name starts with wooden ->
//   // name: {$regex: /^Wooden/i}
//   // ? get the doc where name have whitespace ->
//   // name: {$regex: / /i}
//   // name: {$regex: /\s/i}
//   // ? get the doc where name does not have whitespace -> 
//   // name: {$regex: /^[a-zA-Z0-9-]+[^ ][a-zA-Z0-9-]+$/i}
//   // name: {$regex: /^[\w-]+[^ ][\w-]+$/i}
//   // name: {$regex: /^[\S]+[^\s][\S]+$/i}
//   // name: {$regex: /^[\S]+[\S][\S]+$/i}
//   // ? get the docs where discount price less then 20 (if price > 100 then dp = price * 0.5 else dp = price * 0.75)
//   // $expr : {$lt : [
//   //   {
//   //     $cond: {
//   //       if: {$gte: ["$price", 100]}, 
//   //       then: {$multiply: ["$price", 0.5]}, 
//   //       else: {$multiply: ["$price", 0.75]}
//   //     }
//   //   }, 20
//   // ]}
//   // $where: "this.price == 15" // where is not allow in mongodb atles;
//   // ? get the docs when price is divided by 5 and reminder is 0;
//   // price: {$mod: [5, 0]}

//   // Array Operators 
  

//   }).then((data) => {
//     console.log(data.length);
//   })

// Product.create({
//     "name": "accent chair last",
//     "images": ["image1"],
//     "price": "25",
//     "costPrice": 10,
//     "company": "marcos",
//     "hsnCode": 1255112233,
//     "MRP": "25",
//     "ratings": {
//       "user_rating": [1,2,5]
//     },
//     "HSN_CODE": 1234567890,
//     "GST_RATE": 12,
//     "discription": "product is good in long time usage",
//     "category": "electric",
//     "stockQuantity": 5,
//     "discount": {percentage: 50, valid_until: "07-07-2025"}

//   }).then(p => console.log(p));

// Product.deleteOne({_id: "685adb2f15f6ea033ab38c24"}).then(p => console.log(p));

// Product.findOneAndUpdate({_id: "685adb2f15f6ea033ab38c24"},
//   {$push: {"ratings.user_rating": 4}}, {runValidators: true, new: true}

// ).then(p => console.log(p)).catch(e => console.log(e));

// Product.find({
//   name: { $regex: 'chair', $options: 'i' },
//   company: { $regex: '^ikea$', $options: 'i' }
// })
//   .then(p => console.log(p))
//   .catch(e => console.log(e));

module.exports = Product;

// const now = new Date();
// console.log(now.getFullYear())