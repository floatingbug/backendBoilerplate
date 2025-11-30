require("module-alias/register");
require("dotenv").config();
const express = require("express");
const api = express();
const http = require("http");
const httpServer = http.createServer(api);
const {connectDB} = require("@config/db");


const PORT = process.env.PORT || 3000;
connectDB();


httpServer.listen(PORT, () => {
	console.log(`HTTP-Server is running on port: ${PORT}`);
});
