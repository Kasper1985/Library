using System;

using BusinessLogic.Interfaces;
using DataBase.Interfaces;

namespace BusinessLogic
{
    public class BookLogic : IBookLogic
    {
        private readonly IBookDB bookDB;

        public BookLogic(IBookDB bookDB) => this.bookDB = bookDB ?? throw new ArgumentNullException(nameof(bookDB));
    }
}
