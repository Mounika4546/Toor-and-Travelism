import jwt from 'jsonwebtoken';

// Verify Token Middleware
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ success: false, message: "You are not authorized." });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is invalid." });
        }
        req.user = user; // Attach user to request
        next();
    });
};

// Verify User Middleware
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You are not authenticated." });
        }
    });
};

// Verify Admin Middleware
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ success: false, message: "You are not authorized as admin." });
        }
    });
};
