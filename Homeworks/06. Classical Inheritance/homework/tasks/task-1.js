/* Task Description */
/* 
	Create a function constructor for Person. Each Person must have:
	*	properties `firstname`, `lastname` and `age`
		*	firstname and lastname must always be strings between 3 and 20 characters, containing only Latin letters
		*	age must always be a number in the range 0 150
			*	the setter of age can receive a convertible-to-number value
		*	if any of the above is not met, throw Error 		
	*	property `fullname`
		*	the getter returns a string in the format 'FIRST_NAME LAST_NAME'
		*	the setter receives a string is the format 'FIRST_NAME LAST_NAME'
			*	it must parse it and set `firstname` and `lastname`
	*	method `introduce()` that returns a string in the format 'Hello! My name is FULL_NAME and I am AGE-years-old'
	*	all methods and properties must be attached to the prototype of the Person
	*	all methods and property setters must return this, if they are not supposed to return other value
		*	enables method-chaining
*/
function solve() {
	var Person = (function () {
		var newValue;
		
		function Person(firstname, lastname, age) {
			this.firstname = firstname;
			this.lastname = lastname;
			this.age = age;
		}
		
		function validateNames(name) {
			if (typeof (name) !== 'string' ||
				3 > name.length || name.length > 20 ||
				(name.split('').some(function (char) {
				return 'A' > char || (char > 'Z' && 'a' > char) || char > 'z';
				}))) {
				return false;
			} return true;
		}
		
		Person.prototype.introduce = function () {
			return ('Hello! My name is ' + this.fullname + ' and I am ' + this.age + '-years-old');
		};
		
		Object.defineProperties(Person.prototype, {
			'firstname': {
				get: function () {
					return this._firstname;
				},
				set: function (value) {
					if (!validateNames(value)) {
						throw new Error('Wrong first name!');
					}
					this._firstname = value;
				}
			},
			'lastname': {
				get: function () {
					return this._lastname;
				}, set: function (value) {
					if (!validateNames(value)) {
						throw new Error('Wrong last name!');
					}
					this._lastname = value;
				}
			},
			'age': {
				get: function () {
					return this._age;
				},
				set: function (value) {
					newValue = +value;
					if (!newValue || 0 > newValue || newValue > 150) {
						throw new Error('Wrong age!');
					}
					this._age = value;
				}
			},
			'fullname': {
				get: function () {
					return this.firstname + ' ' + this.lastname;
				},
				set: function (value) {
					newValue = value.split(' ');
					this.firstname = newValue[0];
					this.lastname = newValue[1];
				}
			}
		});
		
		return Person;
	} ());
	return Person;
}
module.exports = solve;