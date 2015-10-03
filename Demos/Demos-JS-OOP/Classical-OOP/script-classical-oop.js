function validate (value, str) {
    return typeof (value) === str;
}

var Person = (function () {
    var _name,
        _age;

    function Person (name, age) {
        if(name) this.name = name;
        if(age) this.age = age;
    }

    Object.defineProperties(Person.prototype, {
        'name': {
            get: function () {
                return _name;
            },
            set: function (value) {
                //defensive programming validations
                if (!validate(value, 'string')) {
                    throw new Error('Wrong name!');
                }

                _name = value;
            },
            enumerable: true,
            configurable: true
        },
        'age': {
            get: function () {
                return _age;
            },
            set: function (value) {
                //defensive programming validations
                if (!validate(value, 'number')) {
                    throw new Error('Wrong age!');
                }

                _age = value;
            },
            enumerable: true,
            configurable: true
        },
        // method inherited by child (instance)
        // 'toString': {
        // 	value: function () {
        // 		return this.name + ' ' + this.age;
        // 	}
        // }
    });

    // method inherited by child (instance)
    Person.prototype.toString = function () {
        return this.name + ' ' + this.age;
    };

    // static method
    Person.toString = function () {
        return this.name + ' ' + this.age;
    };

    return Person;
})();

var Student = (function (parent) {
    // Student.prototype = Object.create(parent.prototype);
    // Student.prototype = parent.prototype; // not good!!!
    Student.prototype = inherited(Person.prototype);

    function inherited(object) {
        function Constructor() { }
        Constructor.prototype = object;
        return new Constructor();
    }

    function Student(name, age, specialty) {
        // Person.call(this, name, age);
        parent.call(this, name, age);
        this.specialty = specialty;
    }

    Object.defineProperty(Student.prototype, 'specialty', {
        get: function () {
            return this._specialty;
        },
        set: function (value) {
            //defensive programming validations
            if (!validate(value, 'string')) {
                throw new Error('Wrong specialty!');
            }

            this._specialty = value;
        }
    });

    // Student.prototype.toString = function () {
    // 	return parent.prototype.toString.call(this) + ' ' + this.specialty;
    // };

    return Student;
})(Person);

var p = new Person('NameP', 44);
var s = new Student('NameS', 19, "Bilogy");

console.log(p);