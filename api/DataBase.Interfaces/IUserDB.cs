using System.Collections.Generic;
using System.Threading.Tasks;

using Common.Models;

namespace DataBase.Interfaces
{
    public interface IUserDB
    {
        Task<User> LoginAsync(string email, string password);
        Task<User> GetUserAsync(int id);
        Task<IEnumerable<User>> FindUsersAsync();
        Task<User> CreateUserAsync(User user);
        Task DeleteUserAsync(int id);
    }
}
