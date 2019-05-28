using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Common.Models;
using BusinessLogic.Interfaces;

namespace LibraryAPI.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserLogic userLogic;

        public UserController(IUserLogic userLogic) => this.userLogic = userLogic ?? throw new ArgumentNullException(nameof(userLogic));

        [HttpPost("login")]
        public async Task<User> Login(string email, string password)
        {
            return await this.userLogic.LoginAsync(email, password);
        }
    }
}