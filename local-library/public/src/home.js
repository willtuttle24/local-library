const getTotalBooksCount = (books) => {
  return books.length;
}

const getTotalAccountsCount = (accounts) => {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = books.reduce((acc, book) => 
                                   {return (acc + (!book.borrows[0].returned));
                                   }, 0);
  return borrowedBooks;
}

function getMostCommonGenres(books) {
  //create empty genreCount object
  let genreCount = {};
  //create empty genreList count array
  let genreList = [];
  //create topGenres helper function to slice the array into the top 5 results
  const topGenres = (array) => {return array.slice(0, 5);}
 //loop through books array to get genre, then total them
  for (let book of books) {
    const genre = book.genre;
    if (genre in genreCount) {genreCount[genre] += 1} else {genreCount[genre] = 1}
  }
  //loop through genreCount, push them into genreList
  for (let genre in genreCount) {
    genreList.push({name : genre, count : genreCount[genre]});
  }
  genreList.sort((genreA, genreB) => genreA.count < genreB.count ? 1 : -1);
  //declare result to topGenres function passing genreList as arguement
  let result = topGenres(genreList);
  return result;
  }

function getMostPopularBooks(books) {
  //map the books
  return books.map(book => {
    //return the title and length of borrows for each popular book
    return {
      name: book.title,
      count: book.borrows.length
    }
    //sort by book borrows count, show top 5 by splicing
  })
    .sort((bookA, bookB) => bookB.count - bookA.count).splice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  //create empty array 
  let mostPopularAuthor = [];
  
  //find the most popular author by matching id, then the most borrowed book by borrows.length
  let popularAuthors = books.filter((book) => authors.find((author) => author.id === book.authorId));
  
  popularAuthors.forEach((book) => {
    //check for matching author
    let author = authors.find((author) => author.id === book.authorId);
    //push author's full name into mostPopularAuthor array
    mostPopularAuthor.push({ name: `${author.name.first} ${author.name.last}`, count: book.borrows.length})
  });
  //return the sort based on count and splice the top five
  return(mostPopularAuthor.sort((countA, countB) => countA.count < countB.count ? 1 : -1)).slice(0,5);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
