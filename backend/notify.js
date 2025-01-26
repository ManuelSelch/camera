import apn, { token } from "apn";
import fs from "fs";

export class Notify {
    apnOptions = {
        token: {
            key: "cert/dev_key.p8",
            keyId: "PF73G7Q4JK",
            teamId: "476LPWUTHD"
        },
        production: false
    };

    constructor() {
        this.apnProvider = new apn.Provider(this.apnOptions);
    }

    readDevicesFile() {
        if (!fs.existsSync("data/devices.json")) {
            return [];
        }
        const data = fs.readFileSync("data/devices.json", 'utf-8');
        return JSON.parse(data);
    }
    

    sendTo(devices) {
        let note = new apn.Notification();
        note.expiry = Math.floor(Date.now() / 1000) + 3600; 
        note.badge = 3;
        note.sound = "ping.aiff";
        note.alert = "Eingang";
        note.payload = {'messageFrom': ''};
        note.topic = "de.selch.Sprechanlage";

        this.apnProvider.send(note, devices).then( (result) => {
            console.log(result);
            console.log("Full Response:", JSON.stringify(result, null, 2));
        });
    }
}