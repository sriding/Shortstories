using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class StoryGenresModel
    {
        public StoryGenresModel(int storyId, string storyGenre)
        {
            StoryGenresId = -1;
            StoryId = storyId;
            StoryGenre = storyGenre;
        }
        [Key]
        public int StoryGenresId { get; set; }
        [ForeignKey("StoryModel")]
        public int StoryId { get; set; }
        public string StoryGenre { get; set; }
    }
}
