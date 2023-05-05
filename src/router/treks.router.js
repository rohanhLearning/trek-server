const { getAllTreks, getTrekById, createtrek, edittrek, deletetrek } = require("../controller/treks.controller");
const { employeeAuth } = require("../helpers/auth.helper");

const treksRouter = require("express").Router();

treksRouter.get('/getalltreks', employeeAuth, getAllTreks);
treksRouter.get('/gettrekbyid/:id', getTrekById);
treksRouter.post('/createtrek', createtrek);
treksRouter.put('/edittrek/:id', edittrek);
treksRouter.delete('/deletetrek/:id', deletetrek);

module.exports = treksRouter;