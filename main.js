require("module-alias/register");
require("dotenv").config();
const express = require("express");
const api = express();
const http = require("http");
const httpServer = http.createServer(api);
const {connectDB} = require("@config/db");
const response = require("@utils/response");
const authRouter = require("@router/auth");


const PORT = process.env.PORT || 3000;
connectDB();


api.use(express.json());

api.use("/auth", authRouter);


api.use("/", (error, req, res, next) => {
    console.log(error);
    response(res, {
        success: false,
        code: 500,
        errors: ["Internal Server Error."],
    });
});


httpServer.listen(PORT, () => {
	console.log(`HTTP-Server is running on port: ${PORT}`);
});
