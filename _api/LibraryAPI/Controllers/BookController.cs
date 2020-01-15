using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using Common.Models;
using BusinessLogic.Interfaces;

namespace LibraryAPI.Controllers
{
    [Route("api/book")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookLogic bookLogic;

        public BookController(IBookLogic bookLogic) => this.bookLogic = bookLogic ?? throw new ArgumentNullException(nameof(bookLogic));

        [HttpGet("{id}")]
        public async Task<Book> GetBook(int id)
        {
            return new Book { ID = id, Author = "Stephen King", InvertoryNumber = "1ZL", Title = "Pet Sematary", Year = 1989, ISBN = "978-0743412285", Available = true };
        }
    }
}  