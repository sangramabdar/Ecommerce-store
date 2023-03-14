"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCartDto = void 0;
const yup = __importStar(require("yup"));
const exceptions_1 = require("../../utils/exceptions");
const cartDto = yup.object().shape({
    id: yup.number().required("id is required"),
    title: yup.string().required("name is required"),
    quantity: yup.number().required("quantity is required"),
    price: yup.number().required("price is required"),
});
async function validateCartDto(req, res, next) {
    try {
        const cartItems = req.body.cartItems;
        if (!Array.isArray(cartItems))
            return next(new exceptions_1.BadRequest("cartItems is required"));
        const newcartItems = [];
        let finalOrder = {};
        for (let order of cartItems) {
            finalOrder = await cartDto.validate(order, { stripUnknown: true });
            newcartItems.push(finalOrder);
        }
        req.body = newcartItems;
        next();
    }
    catch (error) {
        error = new exceptions_1.BadRequest(error.message);
        next(error);
    }
}
exports.validateCartDto = validateCartDto;
