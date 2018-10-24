import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Gamepad from './components/Gamepad';

export default class App extends React.Component {
    constructor() {
        super();
    }

    showSimpleMessage(type = "default", props = {}) {
        const message = {
            message: "Some message title",
            description: "Lorem ipsum dolar sit amet",
            icon: { icon: "auto", position: "left" },
            type,
            ...props,
        };

        showMessage(message);
     }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "#B3B3B3" }}>
                    <Gamepad />
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={[styles.button, styles.demoButton]}
                        onPress={() => this.showSimpleMessage()}
                    >
                        <Text style={[styles.buttonLabel]}>{'I'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={[styles.button, styles.demoButton, { backgroundColor: "#636363" }]}
                        onPress={() => showMessage({ message: "Just one single line in this", type: "info" })}
                    >
                        <Text style={[styles.buttonLabel]}>{'II'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        style={[styles.button, styles.demoButton, { backgroundColor: "#CC00FF" }]}
                        onPress={() =>
                            showMessage({
                                message: "Message that hide your status bar",
                                description: "Cool, uhm?",
                                type: "success"
                            })}
                    >
                        <Text style={[styles.buttonLabel, { fontSize: 14 }]}>{'III'}</Text>
                    </TouchableOpacity>
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
