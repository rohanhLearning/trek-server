const jwt = require("jsonwebtoken");

const employeeAuth = (req, res, next) => {
    const authHeader = req.headers[`authorization`];
    if(!authHeader){
        return res.status(400).json({
            message: "Token not provided",
        })
    }
    const token = authHeader.split(" ")[1];
    try{
        const payload = jwt.verify(token, process.env.SECRET);
        if(!payload){
            return res.status(400).json({
                message: "Invalid token"
            })
        }
        req.user = payload;
        next();
    }catch(err){
        return res.status(400).json({
            message: "Invalid token"
        })
    }  
}

/**
 * @DESC Check Role Middleware
 */
const checkRole = (roles) => async (req, res, next) => {
    let { name } = req.body;
    //retrieve employee info from DB
    const employee = await Employee.findOne({ name });
    !roles.includes(employee.role) ? res.status(401).json("Invalid access"): next();
};

module.exports = {
    employeeAuth, checkRole,
}