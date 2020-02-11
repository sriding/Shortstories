﻿ using System;
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
        [Required(ErrorMessage = "No story tags id. This should be automatic.")]
        [Key]
        [Column(TypeName = "int")]
        public int StoryTagsId { get; set; }
        [Required(ErrorMessage = "There is no tag.")]
        [Column(TypeName = "varchar(25)")]
        [StringLength(25, ErrorMessage = "Tag cannot exceed 25 characters.")]
        public string StoryTag { get; set; }
        [Required(ErrorMessage = "Must be attached to a story. This should be automatic.")]
        [Column(TypeName = "int")]
        public int StoryId { get; set; }

        [ForeignKey("StoryId")]
        public StoryModel Story { get; set; }
    }
}
