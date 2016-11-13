const ambient = require("ambientlight");
const fs = require("fs");
const os = require("os");
const timeout = 5000;

const threshold = 1293160;
const profilesDir = os.homedir() + "/Library/Application\ Support/iTerm2/DynamicProfiles";

const path = {
    dynamicProfile: profilesDir + "/ambi-term.json",
    darkProfile: __dirname + "/profiles/dark-profile.json",
    lightProfile: __dirname + "/profiles/light-profile.json"
};

function checkBrightness() {
    let brightness = ambient();
    if (brightness > threshold) {
        console.log("Loading the light profile");
        fs.createReadStream(path.lightProfile)
            .pipe(fs.createWriteStream(path.dynamicProfile));
    } else {
        console.log("Loading the dark profile");
        fs.createReadStream(path.darkProfile)
            .pipe(fs.createWriteStream(path.dynamicProfile));
    }
    setTimeout(checkBrightness, timeout);
}

setTimeout(checkBrightness, timeout);
