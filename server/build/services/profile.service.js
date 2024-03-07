"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProdfileService = exports.getProfileService = void 0;
const models_1 = require("../models");
const exceptions_1 = require("../utils/exceptions");
async function getProfileService(req) {
    const user = req.user;
    const userDoc = models_1.User.findById(user._id, {
        email: 1,
        firstName: 1,
        lastName: 1,
    });
    if (!userDoc)
        throw new exceptions_1.NotFound("profile");
    return userDoc;
}
exports.getProfileService = getProfileService;
async function updateProdfileService(req) {
    const user = req.user;
    const { firstName, lastName } = req.body;
    const userDoc = await models_1.User.findById(user._id);
    if (!userDoc)
        throw new exceptions_1.NotFound("profile");
    userDoc.firstName = firstName;
    userDoc.lastName = lastName;
    await userDoc.save();
    return null;
}
exports.updateProdfileService = updateProdfileService;
