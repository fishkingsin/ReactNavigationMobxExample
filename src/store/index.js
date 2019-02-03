
// Store/index.js

import { configure } from 'mobx';

import NavStore from './NavStore'

export { Provider } from 'mobx-react'

configure({
    enforceActions: 'observed',
});
export class RootStore {
  constructor ({RootNavigator}) {
    this.nav = new NavStore(RootNavigator)
  }
}

export const initStore  = (options) => new RootStore(options)