// App/RootNavigator.js

import { createStackNavigator } from 'react-navigation'

import AScreen from '~cont/AScreen'
import BScreen from '~cont/BScreen'
import RootContainer from '~cont/RootContainer'

const RootNavigator = createStackNavigator({
  root: { screen: RootContainer },
  A: { screen: AScreen },
  B: { screen: BScreen },
}, {
  initialRouteName: 'root',
})

export default RootNavigator;