using Microsoft.Extensions.DependencyInjection;

using BusinessLogic.Interfaces;
using BusinessLogic;
using DataBase.Interfaces;
using DataBase;

namespace LibraryAPI
{
    public partial class Startup
    {
        public void ConfigureDependencies(IServiceCollection services)
        {
            // Bussines logics
            services.AddScoped<IUserLogic, UserLogic>()
                    .AddScoped<IBookLogic, BookLogic>();

            // Data base
            services.AddTransient<IUserDB, UserDB>()
                    .AddTransient<IBookDB, BookDB>();
        }
    }
}
