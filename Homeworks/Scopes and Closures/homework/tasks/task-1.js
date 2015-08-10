/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];
		
		function listBooks(sortedBy) {
			sortedBy = sortedBy || '';
			if (sortedBy) {
				if (sortedBy.category) {
					if (!books.some(function(book) {
						return book.category === sortedBy.category ? true : false;
					})) {
						return [];
					} else {
						return books.filter(function(book) {
							return book.category === sortedBy.category ? true : false;
						});
					}
				} else if (sortedBy.author) {
					if (!books.some(function(book) {
						return book.author === sortedBy.author ? true : false;
					})) {
						return [];
					} else {
						return books.filter(function(book) {
							return book.author === sortedBy.author ? true : false;
						});
					}
				}
			}
			return books;
		}

		function addBook(book) {
			
			if (!book.title || !book.author || !book.isbn || !book.category || 
				book.title.length < 2 || book.title.length > 100 ||
				book.category.length < 2 || book.category.length > 100 ||
				(book.isbn.length !== 10 && book.isbn.length !== 13)) {
				throw Error;
			}
			
			var isRepeated = books.some(function(item) {
				if (item.title === book.title || item.isbn === book.isbn) {
					return true;
				} return false;
			});
			if (isRepeated) {
				throw Error;
			}
			
			if (!categories.some(function(item) { return (item === book.category ? true : false); })) {
				categories.push(book.category);
			}
			
			book.ID = books.length + 1;
			books.push(book);
			return book;
		}

		function listCategories() {
			return categories;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	}());
	return library;
}

module.exports = solve;
