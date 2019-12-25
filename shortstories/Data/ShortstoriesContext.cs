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
        public DbSet<ProfileModel> Profile { get; set; }
        public DbSet<StoryModel> Story { get; set; }
        public DbSet<FollowersModel> Followers { get; set; }
        public DbSet<StoryChaptersModel> StoryChapters { get; set; }

        public DbSet<StoryGenresModel> StoryGenres { get; set; }
        public DbSet<StoryTagsModel> StoryTags { get; set; }
    }
}
