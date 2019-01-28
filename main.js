// import { TaskCollection, foo } from './TaskCollection';
import TaskCollection, { foo } from './TaskCollection';

new TaskCollection([
	'Go to the store',
	'Finish screencast',
	'Eat cake'
]).dump();