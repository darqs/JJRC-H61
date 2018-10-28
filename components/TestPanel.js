import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import DroneControlInstance from './../utilities/drone';
import XboxPadButtons from './../constants/xboxPadButtons';

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "stretch",
        backgroundColor: "#999",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 8,
        overflow: "hidden",
    },
    buttonLabel: {
        fontSize: 16,
        letterSpacing: -0.3,
        lineHeight: 19,
        textAlign: "center",
        color: "#fff",
    },
    separator: {
        backgroundColor: "#dcdcdc",
        marginTop: 2,
        marginBottom: 13,
        width: "100%",
        height: 1,
    }
});

export default class TestPanel extends React.Component {
    clickButton(button) {
        DroneControlInstance.updatePosition({
            buttons: {
                [button]: true
            }
        });
    }
    render() {
        const clickA = this.clickButton.bind(this, XboxPadButtons.A);
        const clickRB = this.clickButton.bind(this, XboxPadButtons.RB);
        const clickLT = this.clickButton.bind(this, XboxPadButtons.LT);
        const clickRT = this.clickButton.bind(this, XboxPadButtons.RT);
        const startControl = () => {
            DroneControlInstance
                .startControl()
                .then(() => {
                    // showMessage({
                    //     message: 'Application information',
                    //     description: 'Drone calibrated.',
                    //     type: 'info'
                    // });
                })
                .catch((error) => {
                    showMessage({
                        message: 'Application information',
                        description: `Calibratation error: ${error}`,
                        type: 'danger'
                    });
                });
        };
        return (
            <View>
                <View style={styles.group}>
                    <TouchableOpacity activeOpacity={0.75} style={[styles.button]} onPress={startControl}>
                        <Text style={[styles.buttonLabel]}>Try connect to drone</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.separator]} />
                <View style={styles.group}>
                    <TouchableOpacity activeOpacity={0.75} style={[styles.button]} onPress={clickRT}>
                        <Text style={[styles.buttonLabel]}>Start</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.75} style={[styles.button]} onPress={clickLT}>
                        <Text style={[styles.buttonLabel]}>Land</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.separator]} />
                <View style={styles.group}>
                    <TouchableOpacity activeOpacity={0.75} style={[styles.button]} onPress={clickRB}>
                        <Text style={[styles.buttonLabel]}>Emergency stop RB</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.75} style={[styles.button]} onPress={clickA}>
                        <Text style={[styles.buttonLabel]}>Emergency stop A</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.separator]} />
            </View>
        );
    }
}