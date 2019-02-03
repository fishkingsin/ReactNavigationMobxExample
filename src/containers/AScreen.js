import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { observer, inject } from 'mobx-react/native';

@inject('store') @observer
class AScreen extends Component{
    render() {
        return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>A Screen</Text>
        </View>
        );
    }
}
  
export default AScreen;