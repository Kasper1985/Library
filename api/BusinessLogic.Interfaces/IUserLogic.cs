using System.Threading.Tasks;

using Common.Models;

namespace BusinessLogic.Interfaces
{
    public interface IUserLogic
    {
        Task<User> LoginAsync(string email, string password);
    }
}
