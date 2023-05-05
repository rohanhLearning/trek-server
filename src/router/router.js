const router = require("express").Router();
const authRouter = require("./auth.router");
const treksRouter = require("./treks.router");

router.use('/auth', authRouter);
router.use('/treks', treksRouter);

module.exports = router;