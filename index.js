const http = require("http");
const path = require('path');
const express = require('express');
const logger = require("./utils/log");
const port = process.env.PORT || 8080;
const moment = require("moment-timezone");
const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
const app = express();



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(port);
console.log('Server: http://localhost:' + port,"Time:" + gio,"\n\n");

function startBot(message) {
    (message) ? logger(message, "BOT STARTING") : "";
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "marisv5.js"], {
        cwd: __dirname,stdio: "inherit",shell: true
    });
   child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("Loading...");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("Bot đã hoạt động , vui lòng chờ trong giây lát!");
       }
         else return; 
    });
    child.on("error", function (error) {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ Starting ]");
    });
};
startBot()
