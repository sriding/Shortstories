using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class StoryTagsModel
    {
        public StoryTagsModel(int storyId, string storyTag)
        {
            StoryTagsId = -1;
            StoryId = storyId;
            StoryTag = storyTag;
        }
        [Key]
        public int StoryTagsId { get; set; }
        [ForeignKey("StoryModel")]
        public int StoryId { get; set; }
        public string StoryTag { get; set; }
    }
}
