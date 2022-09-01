function findAuthorById(authors, id) {
  const authorInfo = authors.find((author) => 
                     author.id === id); 
  return authorInfo;
}

function findBookById(books, id) {
  const bookInfo = books.find((book) => 
                             book.id === id);
  return bookInfo;
}


function partitionBooksByBorrowedStatus(books) {
  //create two arrays of book status isReturned or notReturned
  let isReturned = books.filter((book) => book.borrows[0].returned);
  let notReturned = books.filter((book) => !book.borrows[0].returned);
  //return the array in the order it is tested
  return [ notReturned, isReturned ];
}

function getBorrowersForBook(book, accounts) {
  //create an empty array for a borrow list
  let borrowList = [];
  //shorten the list
  let borrows = book.borrows;
  //loop through each borrow
  borrows.forEach((borrow) => 
                 //loop through each account
                 accounts.forEach((account) => {
                                //check for accounts that match borrow id
                                if(account.id === borrow.id) {
                                  //if the account and borrow id match
                                  account.returned = borrow.returned;
                                  //push the relevant accounts to the borrow list
                                  borrowList.push(account);
                               }
  }));
  
  return borrowList.slice(0,10);
  
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
