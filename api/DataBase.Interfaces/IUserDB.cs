using System.Threading.Tasks;

using Common.Models;

namespace DataBase.Interfaces
{
    public interface IUserDB
    {
        Task<User> LoginAsync(string email, string password);
    }
}
