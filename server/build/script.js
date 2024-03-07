"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const faker_1 = require("@faker-js/faker");
async function loadProductsToDB() {
    try {
        const products = await (await fetch("https://fakestoreapi.com/products")).json();
        const promises = products.map(product => {
            delete product.id;
            const price = Math.round(product.price);
            product.price = price;
            return models_1.Product.create(product);
        });
        await Promise.all(promises);
    }
    catch (error) {
        console.log(error.message);
    }
}
async function addProduct(product) {
    const productDoc = await models_1.Product.create(product);
    return productDoc;
}
let categories = [
    "jewelery",
    "women's clothing",
    "men's clothing",
    "electronics",
];
function createDummyProduct() {
    const title = faker_1.faker.commerce.productName();
    const price = Number(faker_1.faker.commerce.price({ min: 100, max: 1000 }));
    const description = faker_1.faker.commerce.productDescription();
    const category = faker_1.faker.helpers.arrayElement(categories);
    const image = "";
    const rating = {
        rate: Number(faker_1.faker.number
            .float({
            min: 1,
            max: 5,
        })
            .toPrecision(2)),
        count: faker_1.faker.number.int({
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
mongoose_1.default.connect("mongodb://localhost:27017/ecommerce-store").then(async () => {
    console.log("connected");
    loadProductsToDB();
});
