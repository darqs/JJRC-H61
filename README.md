# JJRC-H61

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/d846e93139d84ae8b1e66e5d9cd92f41)](https://app.codacy.com/app/darqs/JJRC-H61?utm_source=github.com&utm_medium=referral&utm_content=darqs/JJRC-H61&utm_campaign=Badge_Grade_Dashboard)

## How to run app

1.  Install Expo as global package (`npm i -g expo expo-cli`)
2.  Install React-native as global package (`npm i -g react-native-cli`)
3.  Install other packages (`npm i`)
4.  Link UDP native dependency (`react-native link react-native-udp`)
5.  Run app using ExpoCLI (`expo start --lan`)
6.  Install Expo app on your phone
7.  Run Expo and scan QRCode

## TODO

*   check WiFi name - drones network has specific name
*   check Bluetooth device name - Xbox pad has specific name
*   add Xbox pad key schema presentation
*   add Xbox pad configuration

## Tips

### UDP checksum

There was used very simple algorithm for most commands. I need subtract all bytes from each other. Example:

````javascript
	const _ = messageWithoutChecksum = Buffer.from('ff087e3f403f90121200', 'hex');
	const checksum = Buffer.from([ _[0] - _[1] - _[2] - _[3] - _[4] - _[5] - _[6] - _[7] - _[8] - _[9] ])[0];
	// checksum === 0x07
````

I found only 2 exceptions to this relationship:
*   calibration command (`ff087e3f403fd0121200cb`)
*   stop command (`ff087e3f403f901212a069`)
