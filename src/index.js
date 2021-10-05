var express = require('express');
var app = express();
var otherService = express();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();

app.get('/', function (req, res) {
    console.log('root');
    res.send("Hello, World! I am root!");
})

app.get('/foo', function (req, res) {
    res.send("Hello, World! I am foo!");
})

apiProxy.on('proxyReq', (proxyReq, req, res, options) => {
    proxyReq.setHeader('HOST', 'michael-express-test.s3.us-east-2.amazonaws.com')
    console.log(proxyReq)
})

app.get('/:asset', function (req, res) {
    const asset = req.params.asset;
    const targetUrl = `http://michael-express-test.s3.us-east-2.amazonaws.com/favicon.ico`;
    // const targetUrl = `http://127.0.0.1:3000/${asset}`
    console.log(targetUrl);
    apiProxy.web(req, res, { target: targetUrl, prependPath: true, ignorePath: true }, (e) => {
        console.log(e.message);
    });
    // res.send(`${asset}`)
});

otherService.get('/favicon.ico', function (req, res) {
    console.log('other')
    res.send('Other server')
})
otherService.listen(3000);

module.exports = app;