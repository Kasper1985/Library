using System;
using System.Threading.Tasks;

using Newtonsoft.Json.Linq;

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
        public async Task<User> Login(JObject credentials)
        {
            string email, password;

            if (GetCredentials())
                return await this.userLogic.LoginAsync(email, password);
            else
                return null;

            bool GetCredentials()
            {
                email = password = default;
                try
                {
                    email = credentials.Value<string>(nameof(email));
                    password = credentials.Value<string>(nameof(password));
                    return true;
                }
                catch (Exception)
                {
                    return false;
                }
            }
        }
    }
}