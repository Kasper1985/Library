using System;
using System.Threading.Tasks;

using Common.Models;

using BusinessLogic.Interfaces;
using DataBase.Interfaces;

namespace BusinessLogic
{
    public class UserLogic : IUserLogic
    {
        private readonly IUserDB userDB;

        public UserLogic(IUserDB userDB) => this.userDB = userDB ?? throw new ArgumentNullException(nameof(userDB));

        public async Task<User> LoginAsync(string email, string password)
        {
            return await this.userDB.LoginAsync(email, password);
        }
    }
}
