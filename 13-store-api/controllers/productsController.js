const Product = require("../models/productsModel");
require("../models/usersModel");



const createProduct = async (req, res) => {
  const data = req.body;

  const product = await Product.create(data);

  res.status(200).json({success: true, data: product, message: "Product created successfully"});
}

const getAllProductsStatic = async (req, res) => {
  // throw "hleo";
  const products = await Product.find({
    // name: {$regex: "a", $options: "i"}
    name: /a/i //contain 'a'
    // name: /^a/i //start with 'a'
    // name: /a$/i //end with 'a'
  }).sort("name price").select("")

  res.status(200).json({products, nbHits: products.length});
}

const getAllProducts = async (req, res) => {
  let {
    name, company, category, available, keywords, numericFilters, sort, fields, page, limit, 
  } = req.query;
  const queryObject = {};

  if(name) {
    const nameRegExp = `${name.trim()}`;
    queryObject.name = {$regex: nameRegExp, $options: 'i'}
  }
  if(company) {
    const companyRegExp = `^${company.trim()}$`
    queryObject.company = {$regex: companyRegExp, $options: 'i'};
  }
  if(category) {
    const categoryRegExp = `^${category.trim()}$`
    queryObject.category = {$regex: categoryRegExp, $options: 'i'};
  }
  if(available) {
    queryObject.inStock = available.trim() === "true" ? true : false;
  }
  if(keywords) {
    const keywordsArray = keywords.split(",");
    queryObject.keywords = {$in: keywordsArray};
  }
  if(numericFilters) {
    const numFilterRegExp = /\b(<|>|<=|>=|=)\b/ig;
    const operatorMatch = {
      "<": "$lt",
      ">": "$gt",
      "=": "$eq",
      "<=": "$lte",
      ">=": "$gte",
    }
    const options = ["price", "costPrice", "discount.percentage", "MRP" , "rating.avarage", "stockQuantity", "GST_RATE"];

    let filters = numericFilters.replaceAll(numFilterRegExp, match => `~${operatorMatch[match]}~`);

    filters.split(",").forEach(filter => {
      const [field, operator, value, operator2, value2] = filter.split("~");

      if(options.includes(field)) {
        const operation = {};
        operation[operator] = value;
        if(operator2) operation[operator2] = value2;

        queryObject[field] = operation;
      }
    })
  }
  
  let sortString = "_id";
  if(sort) {
    sortString = sort.split(",").join(" ");
  }

  let selectString = "";
  if(fields) {
    selectString = fields.split(",").join(" ");
  }

  limit = Number(limit) || 10;
  page = Number(page) > 0 ? Number(page) : 1;

  const skip = (page - 1) * limit;

  const products = await Product
    .find(queryObject)
    .select(selectString)
    .sort(sortString)
    .skip(skip)
    .limit(limit);
  

  /*
  let result = Product.find(queryObject);
  if(sort) {
    const sortString = sort.split(",").join(" ");
    result = result.sort(sortString);
  } else {
    result = result.sort("_id");
  }

  if(fields) {
    const selectString = fields.split(",").join(" ");
    result = result.select(selectString);
  }

  limit = Number(limit) || 10;
  page = Number(page) > 0 ? Number(page) : 1;

  const skip = (page - 1) * limit;

  const products = await result.skip(skip).limit(limit);
  */

  // console.log(products);
  // console.log(req.query);
  // console.log(queryObject);
  // console.log(sortString);
  // console.log(selectString);
  // console.log(limit);
  // console.log(skip);
  // console.log(page);
  // console.log(" ");
  res.status(200).send({products, nbHits: products.length});
}
// getAllProducts({query: {
//   name: "chair", 
//   company: 'ikea',
//   category: "electronics",
//   available: 'false',
//   keywords: "wireless,electronics"
// }});


const getSingleProduct = async (req, res) => {
  const {id:productId} = req.params;
  const {fields} = req.query;
  
  /*
  const result = Product.findOne({_id: productId});
  if(fields) {
    const str = fields.split(",").join(" ");
    // or str = fields.replaceAll(",", " ");
    result = result.select(str);
  }
  const product = await result;
  */

  let selectionString = "";
  fields && (selectionString = fields.split(",").join(" "));
  const product = await Product.findOne({_id: productId}, selectionString);

  if(!product) {
    throw {success: false, statusCode: 404, message: "Product not found"};
  }

  res.status(200).json({success: true, data: product, message: "Product found with id = " + id});
}


module.exports = {
  createProduct,
  getAllProducts,
  getAllProductsStatic,
  getSingleProduct,
}