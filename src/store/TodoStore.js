import { observable, computed } from 'mobx';

export default class TodoStore {
	@observable todos = [];
    @observable pendingRequests = 0;

    constructor() {
    }

	@computed get completedTodosCount() {
    	return this.todos.filter(
			todo => todo.completed === true
		).length;
    }

	@computed get report() {
		if (this.todos.length === 0)
			return '<none>';
		return `Next todo: '${this.todos[0].task}'. ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`;
	}

	addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
			assignee: null
		});
	}
}
                        