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



## 3. Arrows

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



## 4. Default parameters

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



## 5. Rest and spread

This is about arguments and it is very simple. We take all the rest arguments passed and turn them into array. 

### 5.1 Rest agruments (... operator in function declaration)

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

### 5.2 Spread argumnets (... operator in function call)

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
