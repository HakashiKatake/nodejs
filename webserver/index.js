const http = require('http');
const fs = require('fs');
const url = require('url');


const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Request received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl)
    fs.appendFile('log.txt', log, (err) => {
        if (err) {
            console.error('Error writing to log file', err);
        } else {
            console.log('Log updated');
        }
    })
    
    switch(myUrl.pathname) {
        case '/':
            res.end("This is the home page");
            break;
        case '/about':
            const username = myUrl.query.username;
            if (!username) {
                res.end("Hello there! please provide a query parameter username");
                break;
            }
            res.end(`Hello there! ${username}`);
            break;
        case '/contact':
            res.end("This is the contact page");
            break;
        default:
            res.end("404 Not Found");
            break;
    }

})

myServer.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);