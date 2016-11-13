const plist = require("plist");
const os = require("os");
const fs = require("fs");

const scriptPath = os.homedir() + "/.ambi-term/run.sh";
const launchAgentsPath = os.homedir() + "/Library/LaunchAgents";
const plistPath = launchAgentsPath + "/com.manlycode.ambi-term.plist";

var json = {
    "Label": "com.manlycode.ambi-term",
    "ProgramArguments": [scriptPath],
    "Nice": 1,
    "StartInterval": 10,
    "KeepAlive": true,
    "StandardErrorPath": "/tmp/ambi-term.err",
    "StandardOutPath": "/tmp/ambi-term.out"
};


var plistContent = plist.build(json);
var stream = fs.createWriteStream(plistPath);
stream.write(plistContent);
stream.end();
