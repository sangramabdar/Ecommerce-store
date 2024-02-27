import mongoose from "mongoose";
import { Product } from "./models";
import { faker } from "@faker-js/faker";

async function loadProductsToDB() {
  try {
    const products = await (
      await fetch("https://fakestoreapi.com/products")
    ).json();

    const promises = products.map(product => {
      delete product.id;
      const price = Math.round(product.price);
      product.price = price;
      return Product.create(product);
    });

    await Promise.all(promises);
  } catch (error) {
    console.log(error.message);
  }
}

async function addProduct(product) {
  const productDoc = await Product.create(product);
  return productDoc;
}

let categories = [
  "jewelery",
  "women's clothing",
  "men's clothing",
  "electronics",
];

function createDummyProduct() {
  const title = faker.commerce.productName();
  const price = Number(faker.commerce.price({ min: 100, max: 1000 }));
  const description = faker.commerce.productDescription();
  const category = faker.helpers.arrayElement(categories);
  const image = "";
  const rating = {
    rate: Number(
      faker.number
        .float({
          min: 1,
          max: 5,
        })
        .toPrecision(2)
    ),
    count: faker.number.int({
      min: 50,
      max: 300,
    }),
  };
  return {
    title,
    price,
    description,
    category,
    image,
    rating,
  };
}

mongoose.connect("mongodb://localhost:27017/ecommerce-store").then(async () => {
  console.log("connected");
  loadProductsToDB();
});
