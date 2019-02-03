// Store/NavStore.js

import { NavigationActions } from 'react-navigation'
import { observable, action, toJS } from 'mobx'
import invariant from 'invariant'

const DEFAULT_ROUTE = 'Launch'

export default class NavStore {
  @observable state = {
    index: 0,
    routes: [{ key: DEFAULT_ROUTE, routeName: DEFAULT_ROUTE }]
  }
  lastState = null
  @observable currentRoute = DEFAULT_ROUTE
  @observable currentSubRoute = null
  subscriberRoot = null

  constructor (rootNavigator, subscriberRoot = 'root') {
    this.rootNavigator = rootNavigator
    this.subscribers.set(subscriberRoot, new Set())
    this.addListener = this.createAddListener(subscriberRoot)
    this.subscriberRoot = subscriberRoot
  }

  reset = (routeName, params, action, key) => this.dispatch(NavigationActions.reset({ index: 0, key: null, actions: [NavigationActions.navigate({ routeName, params, action })] }))

  goToSessionModal = (actionType) => this.dispatch(NavigationActions.reset({ index: 1, actions: [{ routeName: 'Internal' }, { routeName: 'Session', params: { actionType } }] }))

  go = (routeName, params) => this.dispatch(NavigationActions.navigate({ routeName, params }))

  back = () => this.dispatch(NavigationActions.back())

  @action('NAV:dispatch')
  dispatch = (action, stackNavState = true) => {
    let currentState = toJS(this.state, false)
    let state = null

    if (action.type !== NavigationActions.COMPLETE_TRANSITION) {
      state = this.rootNavigator.router.getStateForAction(action, currentState)

      let currentRoute = ''
      let currentSubRoute = ''
      let route = {}
      if (state.index < state.routes.length) {
        route = state.routes[state.index]
        currentRoute = route.routeName
        currentSubRoute = route.routes && route.routes[route.index].routeName
      }

      if (currentRoute !== this.currentRoute || currentSubRoute !== this.currentSubRoute) {
        // console.log(`RouteAccepted ${currentRoute} ${currentSubRoute}`)
        this.currentRoute = currentRoute
        this.currentSubRoute = currentSubRoute
        this.state = state
        this.lastState = currentState
      }
    }

    const subscribers = this.subscribers.get(this.subscriberRoot)
    this.triggerAllSubscribers(subscribers, {
      type: 'action',
      action,
      state: state ? toJS(state, false) : currentState,
      lastState: this.lastState
    })
  }

  subscribers = new Map();

  createAddListener (key) {
    invariant(
      this.subscribers.has(key),
      "Cannot listen for a key that isn't associated with a Redux store. " +
        'First call `createReactNavigationReduxMiddleware` so that we know ' +
        'when to trigger your listener.'
    )
    return (eventName, handler) => {
      if (eventName !== 'action') {
        return { remove: () => {} }
      }
      const subscribers = this.subscribers.get(key)
      invariant(subscribers, `subscribers set should exist for ${key}`)
      subscribers.add(handler)
      return {
        remove: () => {
          subscribers.delete(handler)
        }
      }
    }
  }

  triggerAllSubscribers = (subscribers, payload) =>
    subscribers.forEach(subscriber => subscriber(payload))
}