"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.signUpService = void 0;
const bcryptjs_1 = require("bcryptjs");
const repositories_1 = require("../repositories");
const exceptions_1 = require("../utils/exceptions");
const jwt_1 = require("../utils/jwt");
async function signUpService(req) {
    try {
        let { email, password } = req.body;
        let user = await (0, repositories_1.getUserByEmail)(email);
        if (user)
            throw new exceptions_1.EmailExists();
        const salt = await (0, bcryptjs_1.genSalt)(10);
        const hashPassword = await (0, bcryptjs_1.hash)(password, salt);
        let result = await (0, repositories_1.saveUser)(Object.assign(Object.assign({}, req.body), { password: hashPassword }));
        return result;
    }
    catch (error) {
        throw error;
    }
}
exports.signUpService = signUpService;
async function loginService(req) {
    try {
        const { email, password } = req.body;
        const user = await (0, repositories_1.getUserByEmail)(email);
        if (!user) {
            throw new exceptions_1.NotRegistered();
        }
        const isMatched = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isMatched) {
            throw new exceptions_1.BadRequest("password is not matched");
        }
        const token = await (0, jwt_1.generateAccessToken)({
            _id: user._id,
            email: user.email,
        }, "24h");
        return {
            token,
        };
    }
    catch (error) {
        throw error;
    }
}
exports.loginService = loginService;
