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
  //create empty genre array
    let genres = []
    books.forEach(book => {
      let genreExists = genres.find(genre => genre.name === book.genre)
      if (genreExists === undefined){
          genres.push({name: book.genre, count: 1})
      } else {
        genres.forEach(genre => {
          if (genre.name === genreExists.name) {
            genre.count++
          }
        })
      }
    })
    return genres
      .sort((a, b) => b.count - a.count)
      .splice(0, 5)
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
