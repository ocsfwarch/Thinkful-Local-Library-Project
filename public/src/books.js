function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowed = [];
  const returned = [];
  for (book of books) {
    if (book.borrows.every((item) => item.returned === true)) {
      returned.push(book);
    } else {
      borrowed.push(book);
    }
  }
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  const newAccounts = new Map();
  for (let account in accounts) {
    newAccounts.set(accounts[account].id, accounts[account]);
  }
  const results = book.borrows.map((item) => {
    if (item.returned) {
      let borrower = newAccounts.get(item.id);
      borrower["returned"] = true;
      return borrower;
    }
  });
  return results.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
