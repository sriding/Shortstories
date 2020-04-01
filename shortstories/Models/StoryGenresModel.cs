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
        public StoryGenresModel()
        {
        }

        [Required(ErrorMessage = "No story genres id. This should be automatic.")]
        [Key]
        [Column(TypeName = "int")]
        public int StoryGenresId { get; set; }
        [Column(TypeName = "varchar(30)")]
        [StringLength(30, ErrorMessage = "The genre length has a maximum of 30 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9- ]*$", ErrorMessage = "Genres must be alphanumerical with dashes and spaces only. Should be automatic.")]
        public string StoryGenre { get; set; }
        [Required(ErrorMessage = "No story id. This should be automatic.")]
        [Column(TypeName = "int")]
        public int StoryId { get; set; }

        [ForeignKey("StoryId")]
        public StoryModel Story { get; set; }
    }
}
