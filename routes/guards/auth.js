import jwt from "jsonwebtoken"

export default (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(" ")[1];
    
    if (!token) return res.status(401).json({ error: "unauthorized", isLoggedIn: false });
    
    jwt.verify(token, process.env.JWT_SECRET, (err, paylod) => {
        if (err) return res.status(401).json({ error: "faild to authenticate", isLoggedIn: false });

        req.userId = paylod.id;

        next();
    })
}