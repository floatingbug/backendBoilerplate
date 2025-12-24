module.exports = (req, res, next) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    next();
};
