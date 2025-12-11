module.exports = {
    origin: ["https://example.com", "https://app.example.com"], // whitelist
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};
