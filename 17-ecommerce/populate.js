/*

import dotenv from "dotenv"; dotenv.config()
import mongoose from "mongoose"

import connectDB from "./db/connect.js"
import CartItems from "./models/cartItemsModel.js"
import DeliveryOptions from "./models/deliveryOptionsModel.js"
import Orders from "./models/ordersModel.js"
import Products from "./models/productsModel.js"

import defaultProducts from "./defaultData/products.json" assert { type: 'json' }
import defaultOrders from "./defaultData/orders.json" assert { type: 'json' }
import defaultDeliveryOptions from "./defaultData/deliveryOptions.json" assert { type: 'json' }
import defaultCartItems from "./defaultData/cart.json" assert { type: 'json' }

async function setDefault() {
  try {
    const db = await connectDB(process.env.MONGO_URI);
    // await mongoose.connection.db.dropDatabase()
    console.log("Connect to db")
    const collections = await mongoose.connection.db.collections()
    // collections.forEach(collection => {
    //   console.log(collection.collectionName);
    // })
    for (let collection of collections) {
      // await mongoose.connection.db.dropCollection(collection)
      await collection.deleteMany({})
    }

    await Products.create([...defaultProducts])
    console.log("Products populated")
    await Orders.create([...defaultOrders])
    console.log("Orders populated")
    await DeliveryOptions.create([...defaultDeliveryOptions])
    console.log("DeliveryOptions populated")
    await CartItems.create([...defaultCartItems])
    console.log("CartItems populated")

    await mongoose.disconnect()
    console.log("Disconnected to db")
    process.exit(0)

  } catch (err) {
    console.log(err)
    process.exit(1)
  }

}
setDefault()
*/

// import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";

import connectDB from "./db/connect.js";
import CartItems from "./models/cartItemsModel.js";
import DeliveryOptions from "./models/deliveryOptionsModel.js";
import Orders from "./models/ordersModel.js";
import Products from "./models/productsModel.js";

// Load JSON files using fs
const defaultProducts = JSON.parse(
  fs.readFileSync(new URL("./defaultData/products.json", import.meta.url), "utf-8")
);
// const defaultOrders = JSON.parse(
//   fs.readFileSync(new URL("./defaultData/orders.json", import.meta.url), "utf-8")
// );
const defaultDeliveryOptions = JSON.parse(
  fs.readFileSync(new URL("./defaultData/deliveryOptions.json", import.meta.url), "utf-8")
);
const defaultCartItems = JSON.parse(
  fs.readFileSync(new URL("./defaultData/cart.json", import.meta.url), "utf-8")
);

// dotenv.config();

async function setDefault(req, res) {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear all collections
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      console.log(`🗑 Clearing ${collection.collectionName}...`);
      await collection.deleteMany({});
    }

    // Insert default data
    let products = []
    let deliveryOptions = [];
    if (defaultProducts.length) {
      products = await Products.insertMany(defaultProducts);
      console.log(`✅ Inserted ${defaultProducts.length} products`);
    }
    
    if (defaultDeliveryOptions.length) {
      deliveryOptions = await DeliveryOptions.insertMany(defaultDeliveryOptions);
      console.log(`✅ Inserted ${defaultDeliveryOptions.length} delivery options`);
    }

    if (defaultCartItems.length) {
      await CartItems.insertMany(defaultCartItems.map((cartItem, i) => ({
        ...cartItem, 
        product: products[i]._id,
        deliveryOption: deliveryOptions[i]._id
      })));
      console.log(`✅ Inserted ${defaultCartItems.length} cart items`);
    }

    if (defaultCartItems.length) {
      await Orders.create({});
      console.log(`✅ Order created`);
    }

    

    console.log("🎉 Database populated successfully");
    // await mongoose.disconnect();
    // process.exit(0);
    res.sendStatus(200)
  } catch (err) {
    console.error("❌ Error populating database:", err);
    // await mongoose.disconnect();
    // process.exit(1);
    next(err)
  }
}

export default setDefault;
