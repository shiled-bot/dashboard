const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use((req, res) => {
    res.json({
        message: "Welcome",
        code: 200
    });
})

app.listen(port, () => console.log('Listing on port ' + port));