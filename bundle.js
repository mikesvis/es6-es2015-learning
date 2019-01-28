'use strict';

class TaskCollection {

	constructor(tasks = []){
		this.tasks = tasks;
	}

	dump() {
		console.log(this.tasks);
	}

}

// import { TaskCollection, foo } from './TaskCollection';
new TaskCollection([
	'Go to the store',
	'Finish screencast',
	'Eat cake'
]).dump();
