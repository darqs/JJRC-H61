import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class AxisBar extends React.Component {
	render() {
		let width = (50 + (this.props.value)*50) + '%';
		return (
			<View style={{margin: 2, borderColor: '#22f5', borderWidth: 1}}>
				<View style={{width: width, height: '100%', position:'absolute', backgroundColor: '#22f5'}}></View>
				<Text style={{textAlign:'center'}}>{this.props.text}</Text>
			</View>
		)
	}
}

export default class ControllerView extends React.Component {
	render() {
		return (
			<View>
				<View>
				{
					this.props.axes.map((value, i) => <AxisBar key={i} value={value} text={'Axis ' + i + ': ' + value} />)
				}
				</View>
				<View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>{
					this.props.buttons.map((value, i) =>
						<Text key={i}
							style={{
								borderWidth:1,
								backgroundColor: value ? '#22f5': '#fff',
								borderColor: '#22f5',
								padding: 4,
								margin: 4,
								width: 32,
								borderRadius:16,
								textAlign: 'center',
							}}
						>{i}</Text>)
				}</View>
			</View>
		);
	}
}
