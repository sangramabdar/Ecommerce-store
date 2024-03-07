"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.saveUser = void 0;
const models_1 = require("../models");
async function saveUser(user) {
    const userDoc = new models_1.User(Object.assign({}, user));
    await userDoc.save();
    return {
        _id: userDoc._id,
    };
}
exports.saveUser = saveUser;
async function getUserByEmail(email) {
    const userDoc = await models_1.User.findOne({
        email,
    });
    if (!userDoc)
        return null;
    return userDoc;
}
exports.getUserByEmail = getUserByEmail;
