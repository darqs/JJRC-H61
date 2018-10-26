import { Buffer } from 'buffer';

/**
 * In JJRC H61 TCP connection working on 172.16.10.1:8888
 * Command with checksum
 */
export const tcpCommands = {
    photoRequest: Buffer.from('000102030405060708092525', 'hex'),
    videoRequest: Buffer.from('000102030405060708092828', 'hex')
};

/**
 * In JJRC H61 UDP connection working on 172.16.10.1:8080
 * Command with checksum
 */
export const udpCommands = {
    calibration: Buffer.from('ff087e3f403fd0121200cb', 'hex'),
    stop: Buffer.from('ff087e3f403f901212a069', 'hex'),
    idle: Buffer.from('ff08fc3f403f9012120089', 'hex'),
    start: Buffer.from('ff087e3f403f90121240c7', 'hex'),
    land: Buffer.from('ff087e3f403f9012128087', 'hex'),
    // TODO check if this commands should be static ??
    up: Buffer.from('ff08fc3f403f9012120089', 'hex'),
    down: Buffer.from('ff08003f403f9012120085', 'hex'),
    forwards: Buffer.from('ff087e3f013f9012120046', 'hex'),
    backwards: Buffer.from('ff087e3f7f3f90121200c8', 'hex'),
    left: Buffer.from('ff087e3f40009012120046', 'hex'),
    right: Buffer.from('ff087e3f407e90121200c8', 'hex'),
    left_turn: Buffer.from('ff087e00403f9012120046', 'hex'),
    right_turn: Buffer.from('ff087e7e403f90121200c8', 'hex')
};

export default {
    ...tcpCommands,
    ...udpCommands
};
