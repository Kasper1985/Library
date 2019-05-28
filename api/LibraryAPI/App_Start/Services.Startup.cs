using Microsoft.Extensions.DependencyInjection;

using BusinessLogic;
using BusinessLogic.Interfaces;

namespace LibraryAPI
{
    public partial class Startup
    {
        public static void ConfigureDependencies(IServiceCollection services)
        {
            services.AddScoped<IUserLogic, UserLogic>()
                    .AddScoped<IBookLogic, BookLogic>();
        }
    }
}
