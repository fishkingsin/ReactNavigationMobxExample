import React, { Component } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import PropTypes from 'prop-types';
export default class RootContainer extends Component{
    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        console.log('props', props);
    }
    toScreenA = () => {
        this.props.navigation.push('AScreen');
    }

    toScreenB = () => {
        this.props.navigation.push('BScreen');
    }
    
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
                <Button onPress={this.toScreenA} title="A Screen" />
                <Button onPress={this.toScreenB} title="B Sceen"/>
            </View>
        );
    }
}
  