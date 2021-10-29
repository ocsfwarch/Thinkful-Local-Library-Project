function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts
    .map((account) => {
      return { id: account.id, name: account.name };
    })
    .sort((a, b) => {
      return a.name.last > b.name.last ? 1 : -1;
    });
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let book of books) {
    const theBorrows = book.borrows.filter(
      (item) => item.id === account.id && item.returned
    );
    total += theBorrows.length;
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  const theAuthors = new Map();
  const results = [];
  for (let author in authors) {
    theAuthors.set(authors[author].id, authors[author]);
  }

  for (let book of books) {
    const totalBorrows = book.borrows.filter((item) => {
      if (item.id === account.id && !item.returned) {
        return true;
      }
    });

    if (totalBorrows.length > 0) {
      let newAuthor = theAuthors.get(book.authorId);
      if (newAuthor) {
        book["author"] = newAuthor;
        results.push(book);
      }
    }
  }
  if (results.length > 0) {
    return results;
  } else {
    return [];
  }
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
