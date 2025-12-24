module.exports = (req, res, next) => {
    let { refreshToken } = req.body;
    refreshToken = refreshToken?.trim();

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    next();
};
