class Todo {
	constructor(task, id) {
		this.task = task;
		this.id = id;
		this.done = false;
	}
}

var latestId = 0;

function getAllTodos(username) {
	var todos = window.localStorage.getItem(username);
	if (todos == null) {
		return [];
	}
	return JSON.parse(todos);
}

function setAllTodos(username, todos) {
	window.localStorage.setItem(username, JSON.stringify(todos));
}

// Operations on single todo
export function getTodoById(username, id) {
	var todos = getAllTodos(username);
	return todos.find(function (todo) { return id == todo.id; });
}

export function getTodoByTask(username, task) {
	var todos = getAllTodos(username);
	return todos.find(function (todo) { return task == todo.task; });
}

export function deleteTodo(username, id) {
	var todos = getAllTodos(username);
	var todo = getTodoById(username, id);
	if (todo == undefined) {
		return false;
	}
	var index = todos.indexOf(todo);
	todos.splice(index, 1);
	setAllTodos(username, todos);
	return true;
}

export function deleteAllTodos(username) {
	window.localStorage.removeItem(username);
}

export function completeTodo(username, id) {
	var all = getAllTodos(username);
	var todos = all.map(function (todo) {
		if (todo.id == id) {
			todo.done = true;
		}
		return todo;
	});
	setAllTodos(username, todos);
}

export function appendTodo(username, task) {
	if (getTodoByTask(username, task) != undefined) {
		return;
	}
	var todo = new Todo(task, ++latestId);
	var todos = getAllTodos(username);
	todos.push(todo);
	setAllTodos(username, todos);
}

// Get list of todos
export function getCompletedTodos(username) {
	var todos = getAllTodos(username);
	return todos.filter(function (todo) { return todo.done; });
}

export function getDueTodos(username) {
	var todos = getAllTodos(username);
	return todos.filter(function (todo) { return !todo.done; });
}

// Count
export function allTodosCount(username) {
	return getAllTodos(username).length;
}
