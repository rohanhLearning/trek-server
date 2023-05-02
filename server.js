const app = require('express')();

app.get('/ping', (req, res) => {
    res.json({
        status: 200, 
        message: "pong"
    })
})

app.listen(3000, () => {
    console.log("sever started on 3000");
})