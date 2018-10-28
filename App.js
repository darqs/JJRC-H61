import React from 'react';
import { BackHandler, View } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import Gamepad from './components/Gamepad';
import TestPanel from './components/TestPanel';

export default class App extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        showMessage({
            message: 'Application information',
            description: 'Back button was handled and default action was rejected.',
            type: 'info'
        });
        return true;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: "#B3B3B3" }}>
                    <Gamepad/>
                    <TestPanel />
                </View>
                <FlashMessage
                    position={'bottom'}
                    icon={'auto'}
                    animated={true}
                    hideStatusBar={true}
                />
            </View>
        );
    }
}
