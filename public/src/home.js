function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = books.reduce((accum, book) => {
    if (book.borrows.some((item) => item.returned === false)) {
      accum += 1;
    }
    return accum;
  }, 0);
  return total;
}

function getMostCommonGenres(books) {
  const mostCommon = new Map();

  for (let book of books) {
    if (mostCommon.has(book.genre)) {
      let val = mostCommon.get(book.genre);
      val++;
      mostCommon.set(book.genre, val);
    } else {
      mostCommon.set(book.genre, 1);
    }
  }

  return convertMapAndSort(mostCommon, 5);
}

function getMostPopularBooks(books) {
  const mostPopular = new Map();

  for (let book of books) {
    if (mostPopular.has(book.title)) {
      let val = mostPopular.get(book.title);
      val++;
      mostPopular.set(book.title, val);
    } else {
      mostPopular.set(book.title, book.borrows.length);
    }
  }

  return convertMapAndSort(mostPopular, 5);
}

function getMostPopularAuthors(books, authors) {
  const mostPopular = new Map();
  const theAuthors = new Map();
  for (let author in authors) {
    theAuthors.set(authors[author].id, authors[author]);
  }

  for (let book of books) {
    const objAuthor = theAuthors.get(book.authorId);
    if (objAuthor) {
      let strAuthor = `${objAuthor.name.first} ${objAuthor.name.last}`;
      if (mostPopular.has(strAuthor)) {
        let val = mostPopular.get(strAuthor);
        val += book.borrows.length;
        mostPopular.set(strAuthor, val);
      } else {
        mostPopular.set(strAuthor, book.borrows.length);
      }
    }
  }

  return convertMapAndSort(mostPopular, 5);
}

/*
  This is a helper function.
  Parameters: inputMap is a Map object
              max is a number
  The purpose of this function is to convert
  from [[val1,val1]...]
  to [{name:"some value",count:99}]
  and return max number of sorted entries.
*/
const convertMapAndSort = (inputMap, max) => {
  const results = [...inputMap]
    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
    .splice(0, max)
    .map((item) => {
      return { name: item[0], count: item[1] };
    });
  return results;
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
