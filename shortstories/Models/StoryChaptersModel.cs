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
        public StoryChaptersModel(int storyId, int pageNumber, string chapterTitle, string chapterContent, string chapterTheme)
        {
            StoryChaptersId = -1;
            StoryId = storyId;
            PageNumber = pageNumber;
            ChapterTitle = chapterTitle;
            ChapterContent = chapterContent;
            ChapterTheme = chapterTheme;
        }
        [Key]
        public int StoryChaptersId { get; set; }
        [ForeignKey("StoryModel")]
        public int StoryId { get; set; }
        public int PageNumber { get; set; }
        public string ChapterTitle { get; set; }
        public string ChapterContent { get; set; }
        public string ChapterTheme { get; set; }
    }
}
