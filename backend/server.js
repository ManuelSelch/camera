import express from "express";
import { Notify } from './notify.js';
import fs from "fs";

const app = express();
const PORT = 3006;

const notify = new Notify();

function readDevicesFile() {
    if (!fs.existsSync("data/devices.json")) {
        return [];
    }
    const data = fs.readFileSync("data/devices.json", 'utf-8');
    return JSON.parse(data);
}

function writeDevicesFile(devices) {
    fs.writeFileSync("data/devices.json", JSON.stringify(devices, null, 2));
}


app.use(express.json());

app.get('/', (req, res) => {
    let devices = readDevicesFile()
    notify.sendTo(devices)
    res.status(200).json({sentTo: devices});
});

app.get('/register', (req, res) => {
    const device = req.query.device;

    if (!device) {
        return res.status(200).json({ message: 'Device parameter is required' });
    }

    const devices = readDevicesFile();

    if (devices.includes(device)) {
        return res.status(200).json({ message: 'Device is already registered' });
    }

    devices.push(device);
    writeDevicesFile(devices);

    return res.status(200).json({ message: 'Device registered successfully' });
});

app.get('/unregister', (req, res) => {
    var device = req.query.device;

    if (!device) {
        return res.status(200).json({ message: 'Device parameter is required' });
    }

    const devices = readDevicesFile();

    const index = devices.indexOf(device); 

    if (index == -1) {
        return res.status(200).json({ message: 'Device is not registered' });
    }

    devices.splice(index, 1);

    writeDevicesFile(devices);

    return res.status(200).json({ message: 'Device unregistered successfully' });
});

app.get('/devices', (req, res) => {
    const devices = readDevicesFile();

    return res.status(200).json({ devices: devices });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


