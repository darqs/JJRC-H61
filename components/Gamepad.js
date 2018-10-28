import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import GamepadController from 'react-native-gamepad-controller';
import ControllerView from './ControllerView';
import DroneControlInstance from './../utilities/drone';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 50
    }
});

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            gamepad: 'Not connected. Try pressing a key',
            gamepads: {}
        };
    }

    onGamepadConnect(deviceUUID) {
        const { gamepads } = this.state;
        if (!gamepads[deviceUUID]) {
            gamepads[deviceUUID] = { state: 'connected' };
        } else {
            gamepads[deviceUUID] = { state: 'reconnected' };
        }

        this.setState({ gamepads });

        showMessage({
            message: `New gamepad (${deviceUUID}) connected !`,
            description: 'Try pressing some key',
            type: 'info'
        });
    }

    onGamepadDisconnect(deviceUUID) {
        const { gamepads } = this.state;
        if (gamepads[deviceUUID]) {
            gamepads[deviceUUID] = { state: 'disconnected' };
        }

        this.setState({ gamepads });

        showMessage({
            message: `Gamepad (${deviceUUID}) disconnected !`,
            type: 'warning'
        });
    }

    onGamepadData(data) {
        const { gamepads } = this.state;
        if (gamepads[data.gamepadID]) {
            gamepads[data.gamepadID] = { ...gamepads[data.gamepadID], ...data };
        } else {
            gamepads[data.gamepadID] = { state: 'connected', ...data };
        }

        this.setState({ gamepads: gamepads });
        DroneControlInstance.updatePosition(data);
    }

    render() {
        return (
            <View>
                <GamepadController
                    onData={this.onGamepadData.bind(this)}
                    onConnect={this.onGamepadConnect.bind(this)}
                    onDisconnect={this.onGamepadDisconnect.bind(this)}
                    onDisconnectt={this.onGamepadDisconnect.bind(this)}
                />
                {
                    Object.keys(this.state.gamepads).length === 0
                        ? <Text style={styles.text}>Gamepad not connected.</Text>
                        : (
                            <View>
                                <Text>Gamepads: {Object.keys(this.state.gamepads).length}</Text>
                                {
                                    Object
                                        .values(this.state.gamepads)
                                        .map((pad, i) => <ControllerView key={i} axes={pad.axes} buttons={pad.buttons}/>)
                                }
                            </View>
                        )
                }
            </View>
        );
    }
}
