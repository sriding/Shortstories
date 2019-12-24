using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class ProfileModel
    {
        public string profileModelId { get; set; }
        public string profileDescription { get; set; }
        public StoryModel[] profileStories { get; set; }

        public string[] profileFollowers { get; set; }
    }
}
