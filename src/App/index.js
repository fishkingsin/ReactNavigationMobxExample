// App/index.js
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { initStore, Provider } from '~/store'
import RootNavigator from '~/App/RootNavigator'
const AppContainer = createAppContainer(RootNavigator)

export default () => (
  <View style={styles.container}>
    <Provider store={initStore({RootNavigator})} >
      <AppContainer />
    </Provider>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})