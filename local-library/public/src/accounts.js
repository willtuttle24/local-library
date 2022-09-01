//create a function in which a user can find an account by their id, if id's match - return that account's information
function findAccountById(accounts, id) {
  const idAccount = accounts.find((account) => 
                                   account.id === id);
  return idAccount;
}
//use sort method to change array into alphabetizing accounts by last name
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => 
                       (accountA.name.last > accountB.name.last) ? 1 : -1);
}
//find the amount of borrows for each book by finding the length of the array
function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((book) => 
                book.borrows.forEach((isBorrowed) => 
                                               account.id === isBorrowed.id && total ++));
  //return total amount of borrows/book
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = books.filter((book) =>
                                   book.borrows[0].returned === false && book.borrows[0].id === account.id);
  let bookDetails = booksPossessed.map((detail) => ({
    ...detail, author: authors.find((author) => 
                                   author.id === detail.authorId)
  }));
  return bookDetails;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
