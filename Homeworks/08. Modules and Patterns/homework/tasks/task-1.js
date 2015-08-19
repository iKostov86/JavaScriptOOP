/* Task Description */
/* 
* Create a module for a Telerik Academy course
  * The course has a title and presentations
    * Each presentation also has a title
    * There is a homework for each presentation
  * There is a set of students listed for the course
    * Each student has firstname, lastname and an ID
      * IDs must be unique integer numbers which are at least 1
  * Each student can submit a homework for each presentation in the course
  * Create method init
    * Accepts a string - course title
    * Accepts an array of strings - presentation titles
    * Throws if there is an invalid title
      * Titles do not start or end with spaces
      * Titles do not have consecutive spaces
      * Titles have at least one character
    * Throws if there are no presentations
  * Create method addStudent which lists a student for the course
    * Accepts a string in the format 'Firstname Lastname'
    * Throws if any of the names are not valid
      * Names start with an upper case letter
      * All other symbols in the name (if any) are lowercase letters
    * Generates a unique student ID and returns it
  * Create method getAllStudents that returns an array of students in the format:
    * {firstname: 'string', lastname: 'string', id: StudentID}
  * Create method submitHomework
    * Accepts studentID and homeworkID
      * homeworkID 1 is for the first presentation
      * homeworkID 2 is for the second one
      * ...
    * Throws if any of the IDs are invalid
  * Create method pushExamResults
    * Accepts an array of items in the format {StudentID: ..., Score: ...}
      * StudentIDs which are not listed get 0 points
    * Throw if there is an invalid StudentID
    * Throw if same StudentID is given more than once ( he tried to cheat (: )
    * Throw if Score is not a number
  * Create method getTopStudents which returns an array of the top 10 performing students
    * Array must be sorted from best to worst
    * If there are less than 10, return them all
    * The final score that is used to calculate the top performing students is done as follows:
      * 75% of the exam result
      * 25% the submitted homework (count of submitted homeworks / count of all homeworks) for the course
*/

function solve() {
    var Course = (function () {
        var Course = {
            init: function (title, presentations) {
                this.title = title;
                this.presentations = presentations;
                this.students = [];
                return this;
            },
            addStudent: function (name) {
                var names;
                
                if (validateString(name) && (names = name.split(' ')).length === 2 && 
                    validateName(names[0]) && validateName(names[1])) {
                    this.students.push({
                        firstname: names[0],
                        lastname: names[1],
                        id: this.students.length + 1
                    });
                    
                    return this.students.length;
                } throw Error;
            },
            getAllStudents: function () {
                return this.students.slice();
            },
            submitHomework: function (studentID, homeworkID) {
                if (!validateID(studentID) || !validateID(homeworkID) ||
                    studentID > this.students.length || homeworkID > this.presentations.length) {
                    throw Error;
                }
                this.students.forEach(function (item) {
                    if (item.id === studentID) {
                        if (!item.homework) {
                            item.homework = [];
                        }
                        item.homework.push(homeworkID);
                    }
                });
            },
            pushExamResults: function (results) {
                var index,
                    j;
                
                if (Array.isArray(results)) {
                    for (index = 0; index < results.length; index += 1) {
                        if (!validateID(results[index].StudentID) ||
                            results[index].StudentID > this.students.length ||
                            !validateNumber(results[index].score)) {
                            throw Error;
                        }
                    }
                    if (!chekForDuplicates(results)) {
                        throw Error;
                    }
                } else {
                    throw Error;
                }
                
                for (index = 0; index < this.students.length; index += 1) {
                    for (j = 0; j < results.length; j += 1) {
                        if (this.students[index].id == results[j].StudentID) {
                            this.students[index].score = results[j].score;
                        }
                    }
                    if (!this.students[index].score) {
                        this.students[index].score = 0;
                    }
                }
            },
            getTopStudents: function() {
            }
        };
        
        Object.defineProperties(Course, {
            'title': {
                get: function () {
                    return this._title;
                },
                set: function (value) {
                    if (!validateTitle(value)) {
                        throw Error;
                    }
                    this._title = value;
                }
            },
            'presentations': {
                get: function () {
                    return this._presentations;
                },
                set: function (value) {
                    if (!validatePresentations(value)) {
                        throw Error;
                    }
                    this._presentations = value;
                }
            },
        });
        
        function validateTitle (title) {
            var index,
                length = title.length;
                
            if (title && title[0] !== ' ' && title[length - 1] !== ' ') {
                for (index = 1; index < length - 2; index += 1) {
                    if (title[index] === ' ' && title[index + 1] === ' ') {
                        return false;
                    }
                } return true;
            } return false;
        }
        
        function validatePresentations (presentations) {
            var index,
                length = presentations.length;
                
            if (presentations && length !== 0) {
                for (index = 0; index < length; index += 1) {
                    if (!validateTitle(presentations[index])) {
                        return false;
                    }
                } return true;
            } return false;
        }
        
        function validateName (name) {
            var index,
                length;
            if (name[0] !== name[0].toUpperCase()) {
                return false;
            }
            for (index = 1, length = name.length; index < length; index += 1) {
                if (name[index] !== name[index].toLowerCase()) {
                    return false;
                }
            } return true;
        }
        
        function validateString(str) {
            if (typeof(str) === 'string') {
                return true;
            } return false;
        }
        
        function validateNumber(number) {
            if (isNaN(number) || typeof(number) !== 'number') {
                return false;
            } return true;
        }
        
        function validateID(identificator) {
            var parsed = parseInt(identificator);
            
            if (isNaN(parsed) || parsed !== identificator || parsed < 1) {
                return false;
            } return true;
        }
        
        function chekForDuplicates(results) {
            var i,
                len = results.length,
                out = [],
                obj = {};
                
            for (i = 0; i < len; i += 1) {
                obj[results[i].StudentID] = 0;
            }
            for (i in obj) {
                out.push(i);
            }
            return out.length === results.length;
        }
        
        return Course;
    })();
    
    return Course;
};

module.exports = solve;
