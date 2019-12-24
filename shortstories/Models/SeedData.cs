using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using shortstories.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ShortstoriesContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ShortstoriesContext>>()))
            {
                // Look for any movies.
                if (context.User.Any())
                {
                    return;   // DB has been seeded
                }

                context.User.AddRange(
                    new UserModel
                    {
                        UserModelId = "Admin",
                        TimeOfCreation = new DateTime().ToString(System.Globalization.CultureInfo.InvariantCulture),
                        UserUsername = "Stephen Riding",
                        UserPassword = "admin_test"
                    },

                    new UserModel
                    {
                        UserModelId = "User",
                        TimeOfCreation = new DateTime().ToString(System.Globalization.CultureInfo.InvariantCulture),
                        UserUsername = "Guest",
                        UserPassword = "guest_test"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
