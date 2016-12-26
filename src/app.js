import express from "express";
import config from "./config";
import { join } from "path";
import nunjucks from "nunjucks";
const app = express();

app.use( "static", express.static( join( __dirname, "../static" ) ) );
app.use( "node_modules", express.static( join( __dirname, "../node_modules" ) ) );

//配置视图路径
//第一个参数:当通过res.render的时候, 它会从配置的目录中去寻找模板文件
//express:app将app配置给nunjucks, 这样的话在后续代码中就可以用res.render函数了
//watch表示监视文件的改动, 如果文件发生变化,则模板引擎会自动渲染新的内容
//在开发环境配置是watch:true, 生产环境watch:false
nunjucks.configure( config.viewPath, {
    autoescape: true,
    express: app,
    watch: true,
    noCache: false
} );
app.get( "/", ( req, res ) => {
    res.render( "index.html" );
} );
app.get( "/account/register", ( req, res ) => {
    res.render( "register.html" );
} );
app.get( "/account/login", ( req, res ) => {
    res.render( "login.html" );
} );

app.listen( config.port, config.host, () => {
    console.log( "Start Ok!" );
} );
