using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Common.Models;

using DataBase.Interfaces;

namespace DataBase
{
    public class UserDB : IUserDB
    {
        public async Task<User> LoginAsync(string email, string password)
        {
            if (email == "kasper1985@gmail.com" && password == "123456")
                return new User { ID = 1, EMail = email, NameFirst = "Yuriy", NameLast = "Varshavskyy", Salutation = "Herr" };
            else
                return null;
        }

        public async Task<User> GetUserAsync(int id) => throw new NotImplementedException();

        public async Task<IEnumerable<User>> FindUsersAsync() => throw new NotImplementedException();

        public async Task<User> CreateUserAsync(User user) => throw new NotImplementedException();

        public async Task DeleteUserAsync(int id) => throw new NotImplementedException();
    }
}
