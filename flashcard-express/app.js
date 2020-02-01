//const http = require('http');
const log4js = require('log4js');
const dotenv = require('dotenv-extended');
const express = require('express')
const app = express()

log4js.configure('log4js.json');
const logger = log4js.getLogger('server');

// Read the properties from file '.env' and '.env.defaults'
dotenv.load({silent: true});
const PORT = process.env.PORT || 9090;


app.get('/', (req, res) => {
    res.send("Hello World!")
    let logger = log4js.getLogger('app');
    logger.debug("Successfully processed %s request for '%s'", req.method, req.url)
});

app.listen(PORT, () => logger.info(`Server running on ${PORT}`))

//const server = http.createServer((request, response) => {
//    let logger = log4js.getLogger('app');
//    response.writeHead(200, {"Content-Type": "text/plain"});
//    response.end("Hello World\n");
//    logger.debug("Successfully processed %s request for '%s'", request.method, request.url);
//});
//server.listen(PORT);


