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

                context.SaveChanges();
            }
        }
    }
}
