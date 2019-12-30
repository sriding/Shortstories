using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class ProfileModel
    {
        public ProfileModel(string profileDescription)
        {
            string UUID = Guid.NewGuid().ToString(); 
            ProfileModelId = UUID;
            TimeOfCreation = DateTime.UtcNow.ToString();
            ProfileDescription = profileDescription;
        }
        [Key]
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string ProfileModelId { get; }
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string TimeOfCreation { get;  }
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(500)]
        public string ProfileDescription { get; set; }
    }
}
