using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class StoryModel
    {
        public StoryModel(string profileId, string storyTitle, int storyPages, int storyThumbsUp)
        {
            StoryModelId = -1;
            ProfileId = profileId;
            StoryTitle = storyTitle;
            StoryPages = storyPages;
            StoryThumbsUp = storyThumbsUp;

        }
        [Key]
        public int StoryModelId { get; set; }
        [ForeignKey("ProfileModel")]
        public string ProfileId { get; set; }
        public string StoryTitle { get; set; }
        public int StoryPages { get; set; }
        public int StoryThumbsUp { get; set; }
    }
}
