import jwt from "jsonwebtoken"

export default (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(" ")[1];
    
    if (!token) return res.status(401).json({ error: "Unauthorized", isLoggedIn: false });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, paylod) => {
        if (err) return res.status(401).json({ error: "Faild To Authenticate", isLoggedIn: false });

        req.userId = paylod.id;

        next();
    })
}