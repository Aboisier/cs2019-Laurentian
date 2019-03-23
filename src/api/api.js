"use strict";
exports.__esModule = true;
var express_1 = require("express");
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.prototype.getRouter = function () {
        var router = express_1.Router();
        // TODO: You probably want to register your routes here.
        var http = require('http');
        http.createServer(function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('Hello World!');
        }).listen(8080);
        return router;
    };
    return Api;
}());
exports.Api = Api;
