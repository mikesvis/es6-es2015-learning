# ES2015 Crash Course

## 3. To Var, Let, or Const

We already know how to decalare variables

```js
var name="Joe";
```

So why do we need **let** and **const**?

```js
function fire(bool){
	if(bool){
		var foo = "bar";
		console.log(foo);
	} else {
		console.log(foo);
	}
}

fire(false);
```

In this case the output will be **undefined** and this is very confusing because we should get **Reference error: foo is undefined** instead (logically!). This is called **hoisting**: this means in example that behind the scenes var foo gets **hoisted** to the top of the scope like this:

```js
function fire(bool){
	var foo; 

	if(bool){
		foo = "bar";
		console.log(foo);
	} else {
		console.log(foo);
	}
}
```

So now with this example it gets more clear why we get **undefined**. This makes sence that it is a good practice to declare all the variables at the top. Just because of this confusing situation for developers there are two new keywords **let** and **const**.

**let** and **const** are block level declarations (in between the "{" "}").

### 3.1 Let

Lets use **let** in our example:

```js
function fire(bool){
	if(bool){
		let foo = "bar";
		console.log(foo);
	} else {
		console.log(foo);
	}
}
```

fire(false);

Now we get what is logically correct - an error: **Reference error: foo is undefined**. foo is only visible inside of 

```js
if(bool){
	...
}
```

### 3.2 Const

**const** is not just a constant which cannot be changed. It's a bit more difficult and confusing than it appears to be:

```js
const names = ['John', 'Sandy'];
names = ['Frank', 'Susan'];
console.log(names);
```

This will return error **Assignment to a constant variable** as expected, BUT if:

```js
const names = ['John', 'Sandy'];
names.push('Susan');
console.log(names);
```

This will be ok! WTF?! This is an issue about **const**: it is immutable to reassignment. To force immutability for an example above do this:

```js
const months = Object.freeze([...]);
```

### 3.3 Final rules

1\. Use **var** at the top level if you use it like a global variable accessible anywhere.

2\. Default to using **let**.

3\. Use const for variables which won't change (e.g. months names)



## 4. Arrows

Here is an example

```js	
class TaskCollection {
	
	constructor(tasks = []){
		this.tasks = tasks;
	}

	log(){
		this.tasks.forEach(function(task){
			console.log(task);
		});
	}

}

class Task {}

new TaskCollection([
	new Task, new Task, new Task
]).log();
```

What happens when we apply **arrows**? .log() may now look like this:

```js
log(){
	this.tasks.forEach((task) => {
		console.log(task);
	});
}
```

In this case we have only one argument (task) so we can go further and simplify:

```js
log(){
	this.tasks.forEach(task => {
		console.log(task);
	});
}	
```

We are doing only one action in the block. So we can ommit { } like this:

```js
log(){
	this.tasks.forEach(task => console.log(task));
}
```

Wow! There is only 1 line now!

Things to remember:

**1. Arguments**

```js
// No arguments:
() => console.log()

// Only 1 argument:
task => console.log()

// 2 and more arguments:
(task, arg1, arg2) => console.log()
```

**2. Body**

```js
// Only 1 operator:
task => console.log();
// And "return" keyword is implicit. It will automatically happen.

// 2 and more opeartors:
task => {console.log(); console.log();}
```

Remeber that **this** in this case works differently:

```js
log(){
	this.tasks.forEach(task => {
		console.log(this);
	});
}
```

will output *> TaskCollection {tasks: Array[3]}* to browser console. So **this** is a TaskCollection object (**not a function** as we would expect!!!). In other words:

1\. **this** in *function(task){ console.log(this) }* will be changed

2\. **this** in *task => { console.log(this) }* will not be changed 

Example just to memorize:

```js
let names = ['Taylor', 'Jeffrey', 'Adam', 'Matt'];
names = names.map(name => `${name} is cool`);
console.log(names);
```

Will output

```js
['Taylor is cool', 'Jeffrey is cool', 'Adam is cool', 'Matt is cool']
```



## 5. Default parameters

ES6 has now support of default parameters. By example:

```js
function applyDiscount(cost, discount = .10){
	return cost - (cost * discount);
}

alert(applyDiscount(100));
```

Default value doesn't have to be a primitive value. E.g.

```js
function defaultDiscountRate(){
	return .10;
}

function applyDiscount(cost, discount = defaultDiscountRate()){
	return cost - (cost * discount);
}

alert(applyDiscount(100));
```



## 6. Rest and spread

This is about arguments and it is very simple. We take all the rest arguments passed and turn them into array. 

### 6.1 Rest agruments (... operator in function declaration)

```js
function sum(...numbers){
	// the old way function
	return numbers.reduce(function(prev, current)){
		return prev + current;
	}
}

// now we may pass any number of parameters
sum(1, 2, 3);
```

or with ES6 arrows

```js
function sum(...numbers){
	// new arrows way
	return numbers.reduce((prev, current) => prev + current)
}

// now we may pass any number of parameters
sum(1, 2, 3);
```

Just to mention about other arguments - those should be in the beggining

```js
function sum(foo, ...numbers){

}

sum('bar', 1, 2, 3);
```

### 6.2 Spread argumnets (... operator in function call)

This one is diametrically opposite to rest. E.g.

```js
// imagine the function which only accepts separated agruments
function sum(x, y){
	return x + y;
}

// but we have got an array
let numbers = [1, 2];

// now we can spread array to separate values for passing arguments separatelly (not within an array)
sum(...numbers);
```

Just like with **rest** - other parameters should go first

```js
function sum(foo, x, y){

}

let numbers = [1, 2];

sum('bar', ...numbers);
```



## 7. Template strings

With only use of \`STRING_CONTENTS_HERE\` (backticks) we can easily deal with strings:

```js
let template = `
<div class="foo">
	<p class="bar">Hello here!</p>
</div>
`

console.log(template);
```

In case we want to reference a value:

```js
let name = "Michael";

let template = `
<div class="foo">
	<p class="bar">Hello, ${name}!</p>
</div>
`

console.log(template);
```

In case we want to get rid of the white-space in front of template string we can use **trim()**;

```js
let template = `
<div class="foo">
	<p class="bar">Hello, ${name}!</p>
</div>
`.trim();
```



## 8. Awesome object enhancements 

### 8.1 Object shorthand

Lets imagine the following

```js
function getPerson(){

	let name = 'John';
	let age = 25;

	// if we want to return as an object, we must hardcode it like this:
	return {
		name: name,
		age: age
	}

}
```

This **return** hardcoding is kind of annoyng - a bit of repetition there. With ES6 we can do following: In the situation when your property name is the same as the variable then we can remove "**: name**" or/and "**: age**" entirely like below:

```js
function getPerson(){

	let name = 'John';
	let age = 25;
	
	// remove ": name" and ": age" because this property name is the same as variable name.
	// Now we can make it even nicer with one line 
	return { name, age };

}

// call of the property is the same as before
console.log(getPerson().name);
```

This one is in a lot of use. E.g. with Vue:

```js

import HomeView from './components/home-view.vue';
import Alert from './components/alert.vue';
import Notification from './components/notification.vue';

new Vue({
	components: { HomeView, Alert, Notification }

	// earlier we had to code like:
	// components: { HomeView: HomeView, Alert: Alert, Notification: Noification }
	// just a useless repetition of code 
}); 
``` 

### 8.2 Method shorthand

The following example with old style method declaration:

```js
function getPerson(){

	let name = 'John';
	let age = 25;

	return {
		name: name,
		age: age,
		greet: function(){ // ES5 way to write method
			return 'Hello, ' + this.name + '!';
		}
	}

}

console.log(getPerson().greet()); // Hello, John!
``` 

With ES6 we can shorthand method like this: get rid of "**: function**" part + we can apply template strings:

```js
function getPerson(){

	let name = 'John';
	let age = 25;

	return {
		name: name,
		age: age,
		greet(){ // ES6 way
			return `Hello, ${this.name} !`;
		}
	}

}

console.log(getPerson().greet()); // Hello, John!
```

### 8.3 Object destructuring

```js
let person = {
	name: 'Karen',
	age: 32
}

// object destructuring is like this:

let {name, age} = person;

alert(name); // 'Karen'
alert(age); // 32
```

Its like assigning object properties to a coresponding variables. Like destructure object into variables. It is simillar to php's **extract()**:

```php
extract(['name'=>'John']); // now you have variable $name
var_dump($name); // 'John'
```

This is very usefull feature. Imagine that there is an ajax request with returned data:

```js
let data = {
	name: 'Karen',
	age: 32,
	results: ['foo', 'bar'],
	count: 30
}

// The ES5 old way to fetch the results:
// let results = data.results; 
// let count = data.count;

// With ES6 we can simply:
let {results, count} = data;
// and results and count will be extracted or  in other words
// data will be destructured to results and count variables

console.log(results, count);
// > ['foo', 'bar'] 30
```

### 8.4 Object destructuring as a function agrument

We can also use object destructuring as a function argument:

```js
// The ES5 old way to fetch the results:

// simulate ajax request
function getData(data){
	var results = data.results; 
	var count = data.count;	

	console.log(results, count);
}

getData({
	name: 'Karen',
	age: 32,
	results: ['foo', 'bar'],
	count: 30
});

// > ['foo', 'bar'] 30
```

The new ES6 way:

```js
// The new ES6 way:

// simulate ajax request
function getData({results, count}){
	console.log(results, count);
}

getData({
	name: 'Karen',
	age: 32,
	results: ['foo', 'bar'],
	count: 30
});

// > ['foo', 'bar'] 30
```

How cool is that? One more example to memorize:

```js
// ES5
function greet(person){
	var name = person.name;
	var age = person.age;
	
	console.log("Hello, " + name + "! You are " + age +".");
}

greet({
	name: 'Luke',
	age: 24
})

// > 'Hello, Luke! You are 24. 
```

Now ES6 way:

```js
// ES6
function greet({name, age}){
	console.log(`Hello, ${name}! You are ${age}.`);
}

greet({
	name: 'Luke',
	age: 24
})

// > 'Hello, Luke! You are 24. 
```
