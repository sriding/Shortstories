using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace shortstories.Models
{
    public class StoryModel
    {
        public StoryModel()
        {
            _StoryHeadline = "Once upon a time...";
            StoryThumbsUp = 0;
            StoryThumbsDown = 0;
        }

        [Required(ErrorMessage = "Story must have an id. This should be automatic.")]
        [Key]
        [Column(TypeName = "int")]
        public int StoryModelId { get; set; }
        [Required(ErrorMessage = "Story must have a title.")]
        [Column(TypeName = "varchar(80)")]
        [StringLength(80, ErrorMessage = "Story title cannot exceed 80 characters.")]
        public string StoryTitle { get; set; }

        string _StoryHeadline;
        [Required(ErrorMessage = "Story must have a headline.")]
        [Column(TypeName = "varchar(200)")]
        [StringLength(200, ErrorMessage = "Story headline cannot exceed 200 characters.")]
        public string StoryHeadline { 
            get {
                return _StoryHeadline;
            }
            set {
                _StoryHeadline = HttpUtility.HtmlEncode(value);
            } 
        }
#nullable enable
        [Column(TypeName = "varchar(8000)")]
        [StringLength(8000, ErrorMessage = "Content cannot exceed 8000 characters.")]
        public string? StoryContent { get; set; }
#nullable disable
        [Column(TypeName = "int")]
        public int StoryThumbsUp { get; set; }
        [Column(TypeName = "int")]
        public int StoryThumbsDown { get; set; }
        [Required(ErrorMessage = "The story needs a profile id. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "Profile id should be under 100 characters. This should be automatic.")]
        public string ProfileId { get; set; }

        [ForeignKey("ProfileId")]
        public virtual ProfileModel Profile { get; set; }
    }
}
