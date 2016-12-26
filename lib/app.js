"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _path = require("path");

var _nunjucks = require("nunjucks");

var _nunjucks2 = _interopRequireDefault(_nunjucks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use("static", _express2.default.static((0, _path.join)(__dirname, "../static")));
app.use("node_modules", _express2.default.static((0, _path.join)(__dirname, "../node_modules")));

//配置视图路径
//第一个参数:当通过res.render的时候, 它会从配置的目录中去寻找模板文件
//express:app将app配置给nunjucks, 这样的话在后续代码中就可以用res.render函数了
//watch表示监视文件的改动, 如果文件发生变化,则模板引擎会自动渲染新的内容
//在开发环境配置是watch:true, 生产环境watch:false
_nunjucks2.default.configure(_config2.default.viewPath, {
    autoescape: true,
    express: app,
    watch: true,
    noCache: false
});
app.get("/", function (req, res) {
    res.render("index.html");
});
app.get("/account/register", function (req, res) {
    res.render("register.html");
});
app.get("/account/login", function (req, res) {
    res.render("login.html");
});

app.listen(_config2.default.port, _config2.default.host, function () {
    console.log("Start Ok!");
});