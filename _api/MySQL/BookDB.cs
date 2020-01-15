using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Common.Models;

using DataBase.Interfaces;

namespace DataBase
{
    public class BookDB : IBookDB
    {
        public async Task<Book> GetBookAsync(int id) => throw new NotImplementedException();

        public async Task<IEnumerable<Book>> FindBooksAsync() => throw new NotImplementedException();

        public async Task<Book> CreateBookAsync(Book book) => throw new NotImplementedException();

        public async Task DeleteBook() => throw new NotImplementedException();
    }
}
