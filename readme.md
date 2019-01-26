# ES2015 Crash Course

## 3. To Var, Let, or Const

We already know how to decalare variables

	var name="Joe";

So why do we need **let** and **const**?
	
	function fire(bool){
		if(bool){
			var foo = "bar";
			console.log(foo);
		} else {
			console.log(foo);
		}
	}

	fire(false);

In this case the output will be **undefined** and this is very confusing because we should get **Reference error: foo is undefined** instead (logically!). This is called **hoisting**: this means in example that behind the scenes var foo gets **hoisted** to the top of the scope like this:

	function fire(bool){
		var foo; 

		if(bool){
			foo = "bar";
			console.log(foo);
		} else {
			console.log(foo);
		}
	}

So now with this example it gets more clear why we get **undefined**. This makes sence that it is a good practice to declare all the variables at the top. Just because of this confusing situation for developers there are two new keywords **let** and **const**.

**let** and **const** are block level declarations (in between the "{" "}").

### 3.1 Let

Lets use **let** in our example:

	function fire(bool){
		if(bool){
			let foo = "bar";
			console.log(foo);
		} else {
			console.log(foo);
		}
	}

	fire(false);

Now we get what is logically correct - an error: **Reference error: foo is undefined**. foo is only visible inside of 

	if(bool){
		...
	}

### 3.2 Const

**const** is not just a constant which cannot be changed. It's a bit more difficult and confusing than it appears to be:
	
	const names = ['John', 'Sandy'];
	names = ['Frank', 'Susan'];
	console.log(names);

This will return error **Assignment to a constant variable** as expected, BUT if:

	const names = ['John', 'Sandy'];
	names.push('Susan');
	console.log(names);

This will be ok! WTF?! This is an issue about **const**: it is immutable to reassignment. To force immutability for an example above do this:

	const months = Object.freeze([...]);

### 3.3 Final rules

1\. Use **var** at the top level if you use it like a global variable accessible anywhere.

2\. Default to using **let**.

3\. Use const for variables which won't change (e.g. months names)
