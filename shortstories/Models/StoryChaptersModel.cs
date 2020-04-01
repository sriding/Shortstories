using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace shortstories.Models
{
    public class StoryChaptersModel
    {
        public StoryChaptersModel()
        {
        }

        [Required(ErrorMessage = "No story chapters id. This should be automatic.")]
        [Key]
        [Column(TypeName = "int")]
        public int StoryChaptersId { get; set; }
        [Required(ErrorMessage = "Chapter number is required.")]
        [Column(TypeName = "int")]
        public int ChapterNumber { get; set; }

        [Required(ErrorMessage = "Chapter title is required.")]
        [Column(TypeName = "varchar(80)")]
        [StringLength(80, ErrorMessage = "Chapter titles cannot exceed 80 characters.")]
        [RegularExpression(@"^((?![<>])[\x00-\x7F])*$", ErrorMessage = "No < or > characters, and must use ASCII.")]
        public string ChapterTitle { get; set; }

        [Required(ErrorMessage = "Chapter content is required.")]
        [Column(TypeName = "varchar(4000)")]
        [StringLength(4000, ErrorMessage = "Content cannot exceed 4000 characters.")]
        [RegularExpression(@"^((?![<>])[\x00-\x7F])*$", ErrorMessage = "No < or > characters, and must use ASCII.")]
        public string ChapterContent { get; set; }
        [Required(ErrorMessage = "No story id supplied. This should be automatic.")]
        [Column(TypeName = "int")]
        public int StoryId { get; set; }

        [ForeignKey("StoryId")]
        public StoryModel Story { get; set; }
    }
}
