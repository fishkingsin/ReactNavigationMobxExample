/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {observable, action} from 'mobx';

// class Search extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Search screen</Text>
//       </View>
//     )
//   }
// }

// class Index extends Component {
//   render() {
//     const {navigate} = this.props.navigation
//     return (
//       <View style={styles.container}>
//         <Text>Index screen</Text>
//         <TouchableOpacity onPress={()=>navigate("Search", {"title": "Search"})}>
//           <Text>Go to Search</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
// }

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  HomeScreen: HomeScreen,
  // Index: Index,
  // Search: Search,
}, {
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    // header: ({state}) => {
    //   return {title: state.params && state.params.title}
    // },
  },
});


// sourced and modified from https://github.com/react-community/react-navigation/issues/34#issuecomment-281651328

class NavigationStore {
  @observable headerTitle = "Index"
  @observable.ref navigationState = {
    index: 0,
    routes: [
      { key: "Index", routeName: "Index" },
    ],
  }

  // NOTE: the second param, is to avoid stacking and reset the nav state
  @action dispatch = (action, stackNavState = true) => {
    const previousNavState = stackNavState ? this.navigationState : null;
    return this.navigationState = AppNavigator
        .router
        .getStateForAction(action, previousNavState);
  }
}

// NOTE: the top level component must be a reactive component
@observer
export default class App extends Component {
  constructor(props, context) {
    super(props, context)
    // initialize the navigation store
    this.store = new NavigationStore()
  }

  render() {
    // patch over the navigation property with the new dispatch and mobx observed state
    return (
      // <AppNavigator navigation={addNavigationHelpers({
      //   dispatch: this.store.dispatch,
      //   state: this.store.navigationState,
      //   addListener: () => { /* left blank */ }
      // })}/>
      <View></View>
    )
  }
};