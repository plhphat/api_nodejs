// const jwt = require("jsonwebtoken");

// export function identityMiddleware(req, res, next) {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader?.split(" ")[1];
//     console.log("token: ", token);

//     if (!token) return res.status(401);
//     else {
//         jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
//             if (err) return res.status(403);
//             req.user = user;
//             next();
//         });
//     }
// }