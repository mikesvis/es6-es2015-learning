var TaskCollection = function TaskCollection(tasks){
	if ( tasks === void 0 ) tasks = [];

	this.tasks = tasks;
};

TaskCollection.prototype.dump = function dump () {
	console.log(this.tasks);
};

new TaskCollection([
	'Go to the store',
	'Finish screencast',
	'Eat cake'
]).dump();
