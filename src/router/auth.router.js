const authRouter = require("express").Router();
const {signup, login} = require('../controller/auth.controller');
const { employeeAuth } = require("../helpers/auth.helper");

authRouter.post('/signup', signup);
authRouter.post('/login', login);

module.exports = authRouter;