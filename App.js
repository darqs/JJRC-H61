import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Gamepad from './components/Gamepad';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    demoButton: {
        alignSelf: "auto",
        marginBottom: 9,
        marginHorizontal: 5,
    }
});

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "#B3B3B3" }}>
                    <Gamepad />
                </View>
                <FlashMessage
                    position={ 'bottom' }
                    icon={ 'auto' }
                    animated={ true }
                    hideStatusBar={ true }
                />
            </View>
        );
    }
}
