function validate (value, str) {
    return typeof (value) === str;
}

if (typeof Object.create !== 'function') {
    Object.create = function (object) {
        function Constructor () { }
        Constructor.prototype = object;
        return new Constructor();
    };
}

var animal = (function () {
    var _name,
        _age,
        animal = Object.create(Object.prototype);

    Object.defineProperties(animal, {
        'init': {
            value: function (name, age) {
                this.name = name;
                this.age = age;
                return this;
            }
        },
        'name': {
            get: function () {
                return _name;
            },
            set: function (value) {
                if (!validate(value, 'string')) {
                    throw new Error('Wrong name!');
                }

                _name = value;
            }
        },
        'age': {
            get: function () {
                return _age;
            },
            set: function (value) {
                if (!validate(value, 'number')) {
                    throw new Error('Wrong age!');
                }

                _age = value;
            }
        },
        'toString': {
            value: function () {
                return (this.name + ' ' + this.age);
            }
        }
    });

    return animal;
}) ();

var cat = (function (parent) {
    var _color,
        cat = Object.create(parent);

    Object.defineProperties(cat, {
        'init': {
            value: function (name, age, color) {
                parent.init.call(this, name, age);
                this.color = color;
                return this;
            }
        },
        'color': {
            get: function () {
                return _color;
            },
            set: function (value) {
                if (!validate(value, 'string')) {
                    throw new Error('Wrong color!');
                }

                _color = value;
            }
        },
        'toString': {
            value: function () {
                return (parent.toString.call(this) + ' ' + this.color);
            }
        }
    });

    return cat;
})(animal);

var c = Object.create(cat).init('N', 17, 'green');