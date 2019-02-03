// App/index.js
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { initStore, Provider } from '~/store'
import RootContainer from '~cont/RootContainer'
import RootNavigator from '~/App/RootNavigator'

const store = initStore({RootNavigator})

export default () => (
  <View style={styles.container}>
    <Provider store={store} >
      <RootNavigator />
    </Provider>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
})