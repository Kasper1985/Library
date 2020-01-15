using System.Collections.Generic;
using System.Threading.Tasks;

using Common.Models;

namespace DataBase.Interfaces
{
    public interface IBookDB
    {
        Task<Book> GetBookAsync(int id);
        Task<IEnumerable<Book>> FindBooksAsync();
        Task<Book> CreateBookAsync(Book book);
        Task DeleteBook();
    }
}
