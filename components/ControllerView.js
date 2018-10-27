import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    text: {
        borderWidth: 1,
        backgroundColor: value ? '#22f5' : '#fff',
        borderColor: '#22f5',
        padding: 4,
        margin: 4,
        width: 32,
        borderRadius: 16,
        textAlign: 'center',
    }
});

class AxisBar extends React.Component {
    render() {
        let width = `${(50 + (this.props.value) * 50)}%`;
        return (
            <View style={{ margin: 2, borderColor: '#22f5', borderWidth: 1 }}>
                <View style={{
                    width,
                    height: '100%',
                    position: 'absolute',
                    backgroundColor: '#22f5'
                }}/>
                <Text style={{ textAlign: 'center' }}>{this.props.text}</Text>
            </View>
        );
    }
}

export default class ControllerView extends React.Component {
    render() {
        const { axes, buttons } = this.props;
        return (
            <View>
                <View>
                    {axes
                        ? axes.map((value, i) => <AxisBar key={i} value={value} text={`Axis ${i}: ${value}`}/>)
                        : (<Text>Axis not found</Text>)
                    }
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>{
                    buttons
                        ? buttons.map((value, i) =>
                            <Text key={i} style={styles.text}>{i}</Text>)
                        : (<Text>Buttons not found</Text>)
                }</View>
            </View>
        );
    }
}
