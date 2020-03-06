using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class StoryChaptersModel
    {
        public StoryChaptersModel(int storyId, int chapterNumber, string chapterContent, string chapterTitle = null)
        {
            StoryChaptersId = -1;
            StoryId = storyId;
            ChapterNumber = chapterNumber;
            ChapterTitle = chapterTitle;
            ChapterContent = chapterContent;
        }
        [Required(ErrorMessage = "No story chapters id. This should be automatic.")]
        [Key]
        [Column(TypeName = "int")]
        public int StoryChaptersId { get; set; }
        [Required(ErrorMessage = "Chapter number is required.")]
        [Column(TypeName = "int")]
        public int ChapterNumber { get; set; }
    #nullable enable
        [Column(TypeName = "varchar(80)")]
        [StringLength(80, ErrorMessage = "Chapter titles cannot exceed 80 characters.")]
        public string? ChapterTitle { get; set; }
    #nullable disable
        [Required(ErrorMessage = "Chapter content is required.")]
        [Column(TypeName = "varchar(4000)")]
        [StringLength(4000, ErrorMessage = "Content cannot exceed 4000 characters.")]
        public string ChapterContent { get; set; }
        [Required(ErrorMessage = "No story id supplied. This should be automatic.")]
        [Column(TypeName = "int")]
        public int StoryId { get; set; }

        [ForeignKey("StoryId")]
        public StoryModel Story { get; set; }
    }
}
