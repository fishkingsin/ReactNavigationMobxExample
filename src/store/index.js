
// Store/index.js

import { configure } from 'mobx';

import NavStore from './NavStore';
import TodoStore from './TodoStore';

export { Provider } from 'mobx-react';

configure({
	enforceActions: 'observed',
});
export class RootStore {
	constructor ({RootNavigator}) {
		this.nav = new NavStore(RootNavigator);
		this.todo = new TodoStore();
	}
}

export const initStore  = (options) => new RootStore(options);