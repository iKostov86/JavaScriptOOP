/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
      * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
  * method removeAttribute(attribute)
    * throw Error if attribute does not exist in the domElement
*/


/* Example

var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)

var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);

console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/


function solve() {
	var domElement = (function () {
		var domElement = Object.create(Object);

		Object.defineProperties(domElement, {
			'init': {
				value: function (tag) {
					this.tag = tag;
					return this;
				}
			},
			'tag': {
				get: function () {
					return this._tag;
				},
				set: function (value) {
					if (!validate(value, /^[0-9A-Za-z-]+$/g)) {
						throw Error;
					}
					this._tag = value;
				}
			},
			'appendChild': {
				value: function (child) {
					var obj;
					if (typeof (child) === 'string') {
						obj = {
							tag: child,
							parent: this
						};
						this.children.push(obj);
					} else if (Object.getPrototypeOf(child) === domElement) {
						child.parent = this;
						this.children.push(child);
					}
					return this;
				}
			},
			'addAttribute': {
				value: function (name, value) {
					var index;
					if (!validate(name, /^[0-9A-Za-z-]+$/g)) {
						throw Error;
					}
					index = findIndex(this.attributes, name);
					if (index !== undefined) {
						this.attributes[index].value = value;
					} else {
						this.attributes.push({ name: name, value: value });
					}
					return this;
				}
			},
			'removeAttribute': {
				value: function (attribute) {
					var index = findIndex(this.attributes, attribute);
					if (index === undefined) {
						throw Error;
					}
					this.attributes.splice(index, 1);
					return this;
				}
			},
			'children': {
				get: function () {
					if (!this._children) {
						this._children = [];
					}
					return this._children;
				},
				set: function (value) {
					this._children = value;
				}
			},
			'attributes': {
				get: function () {
					if (!this._attributes) {
						this._attributes = [];
					}
					return this._attributes;
				},
				set: function (value) {
					this._attributes = value;
				}
			},
			'content': {
				value: '',
				writable: true
			},
			'parent': {
				writable: true
			},
			'innerHTML': {
				get: function () {
					var inside,
						attr;

					inside = this.children.reduce(function (result, item) {
						if (Object.getPrototypeOf(item) === domElement) {
							return result + item.innerHTML;
						} else {
							return result + item.tag;
						}
					}, '');
					
					attr = this.attributes.sort(function (a, b) {
							return a.name > b.name;
						})
						.reduce(function (result, item) {
							return result + ' ' + item.name + '="' + item.value + '"';
					}, '');
						
					if (!inside && this.content) {
						inside = this.content;
					}
					
					return '<' + this.tag + attr + '>' + inside + '</' + this.tag + '>';
				}
			}
		});
		
		function validate (value, regex) {
			return (typeof(value) === 'string' && value && regex.test(value));
		}
		
		function findIndex(attributes, attribute) {
			var index;
			attributes.some(function (item, i) {
				if (item.name === attribute) {
					index = i;
					return true;
				} return false;
			});
			return index;
		}
		
		return domElement;
	} ());
	
	return domElement;
}

module.exports = solve;
