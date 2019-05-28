using System;
using System.Threading.Tasks;

using Common.Models;

using DataBase.Interfaces;

namespace MySQL
{
    public class UserDB : IUserDB
    {
        public async Task<User> LoginAsync(string email, string password)
        {
            throw new NotImplementedException();
        }
    }
}
