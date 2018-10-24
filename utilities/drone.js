import dgram from 'dgram';
import buffer from 'buffer';

class DroneControl {
	startControl() {
		// open udp connection
		// send "calibration"
		// change connection status
		// start send "idle"
	}

	updatePosition({ axes, buttons }) {
		// first: check connection status
		// second: check commands priority (stop is most inportant)
		//
		// RT - one key start
		// LT - one key land
		// RB - stop
		// A  - stop
	}

	calculateChecksum(message) {
		const _ = message;
		return Buffer.from([ _[0] - _[1] - _[2] - _[3] - _[4] - _[5] - _[6] - _[7] - _[8] - _[9] ])[0];
	}
}

const instance = new DroneControl();
export default instance;
