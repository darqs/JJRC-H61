import dgram from 'dgram';
import { Buffer } from 'buffer';
import { showMessage } from 'react-native-flash-message';
import JJRCCommands from './../constants/jjrcCommands';
import XboxPadButtons from './../constants/xboxPadButtons';

const messageSenderLoopTime = 30;

/* eslint indent: ["error", 4, { "SwitchCase": 1 }] */

class DroneUtils {
    static calculateChecksum(message) {
        const _ = message;
        return Buffer.from([_[0] - _[1] - _[2] - _[3] - _[4] - _[5] - _[6] - _[7] - _[8] - _[9]])[0];
    }

    static validateChecksum(message) {
        if (message[10] !== DroneUtils.calculateChecksum(message)) {
            throw new Error('Checksum not correct !');
        }
    }

    static randomPort() {
        return Math.random() * 60536 | 0 + 5000 // 60536-65536
    }
}

class DroneControl {
    constructor() {
        // this.udp = { host: '172.16.10.1', port: 8080 };
        this.udp = { host: '127.0.0.1', port: 33333 };
        this.errorCount = 1;
        this.calibrated = false;
        this.command = JJRCCommands.idle;

        // when "stop" command was send - other commands shouldn't be send
        this.emergancyEnabled = false;
    }

    createSocket() {
        return new Promise((resolve, reject) => {
            this.client = dgram.createSocket('udp4');
            this.client.bind(DroneUtils.randomPort(), (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    async startControl() {
        await this.createSocket();
        await this.sendCalibrationPackage();
        this.calibrated = true;
        this.startSenderLoop();
    }

    startSenderLoop() {
        this.interval = setInterval(() => {
            if (!this.emergancyEnabled) {
                this.sendMessage(this.command);
            }
        }, messageSenderLoopTime);

        this.timeout = setTimeout(() => {
            // Reset command to "idle" every some time (50 normal loops)
            this.command = JJRCCommands.idle;
        }, messageSenderLoopTime * 50);
    }

    sendCalibrationPackage() {
        return this.sendPackage({
            message: JJRCCommands.calibration,
            validateNeeded: false
        });
    }

    sendEmergencyStopPackage() {
        return this.sendPackage({
            message: JJRCCommands.stop,
            validateNeeded: false
        }, () => {
            this.emergancyEnabled = false;
        });
    }

    sendPackage({ message, validateNeeded = true }, callback = (() => {})) {
        return new Promise((resolve) => {
            let i = 0;
            const interval = setInterval(() => {
                this.sendMessage(message, validateNeeded);
                i++;
                if (i === 100) {
                    clearInterval(interval);
                    callback();
                    resolve();
                }
            }, messageSenderLoopTime);
        });
    }

    sendMessage(message, validateChecksum = true) {
        if (validateChecksum) {
            DroneUtils.validateChecksum(message);
        }

        this.client.send(message, this.udp.port, this.udp.host, (error) => {
            if (error) {
                this.showError(`Message ${message} can't be send. Check connection to drone.`);
            }
        });
    }

    showError(description) {
        showMessage({
            message: `Error #${this.errorCount}`,
            description,
            type: 'danger'
        });
        this.errorCount++;
    }

    updatePosition({ axes, buttons }) {
        if (!this.calibrated) {
            this.showError('Drone was\'t calibrated yet.');
            return;
        }

        if (buttons[XboxPadButtons.RB] || buttons[XboxPadButtons.A]) {
            this.emergancyEnabled = true;
            this.sendEmergencyStopPackage();
        } else if (buttons[XboxPadButtons.LT]) {
            this.command = JJRCCommands.land;
        } else if (buttons[XboxPadButtons.RT]) {
            this.command = JJRCCommands.start;
        }

        // first: check connection status
        // second: check commands priority (stop is most inportant)
        //
        // RT - one key start
        // LT - one key land
        // RB - stop
        // A  - stop
    }
}

const instance = new DroneControl();
export default instance;
