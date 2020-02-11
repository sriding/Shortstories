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
        public StoryChaptersModel(int storyId, int chapterNumber, string chapterContent, string chapterTitle = null, string chapterTheme = "Default")
        {
            StoryChaptersId = -1;
            StoryId = storyId;
            ChapterNumber = chapterNumber;
            ChapterTitle = chapterTitle;
            ChapterContent = chapterContent;
            ChapterTheme = chapterTheme;
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
        [Column(TypeName = "varchar(3000)")]
        [StringLength(3000, ErrorMessage = "Content cannot exceed 3000 characters.")]
        public string ChapterContent { get; set; }
        [Required(ErrorMessage = "Chapter theme is required. Should be automatic if left empty.")]
        [Column(TypeName = "varchar(30)")]
        [StringLength(30, ErrorMessage = "Theme cannot exceed 30 characters.")]
        public string ChapterTheme { get; set; }
        [Required(ErrorMessage = "No story id supplied. This should be automatic.")]
        [Column(TypeName = "int")]
        public int StoryId { get; set; }

        [ForeignKey("StoryId")]
        public StoryModel Story { get; set; }
    }
}
