using Microsoft.EntityFrameworkCore;
using shortstories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Data
{
    public class ShortstoriesContext : DbContext
    {
        public ShortstoriesContext(
            DbContextOptions<ShortstoriesContext> options)
            : base(options)
        {
        }

        public DbSet<UserModel> User { get; set; }
    }
}
