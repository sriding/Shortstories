using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class StoryModel
    {
        public int storyModelId { get; set; }
        public ProfileModel profileId { get; set; }
        public string storyTitle { get; set; }
        public string[] storyGenres { get; set; }
        public string[] storyTags { get; set; }
        public int storyChapters { get; set; }
        public string[] storyChapterTitles { get; set; }
        public string[] storyChapterContent { get; set; }
        public string[] storyChapterThemes { get; set; }
        public int storyThumbsUp { get; set; }
    }
}
