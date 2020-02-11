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
        public ProfileModel(string userId, string profileDescription = null)
        {
            ProfileModelId = Guid.NewGuid().ToString(); 
            TimeOfCreation = DateTime.UtcNow.ToString();
            ProfileDescription = profileDescription;
            UserId = userId;
        }
        [Key]
        [Required(ErrorMessage = "No profile id for the profile. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The length of the profile id cannot exceed 100 characters.")]
        public string ProfileModelId { get; set; }

        [Required(ErrorMessage = "No time of creation for the profile. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The time of creation cannot exceed 100 characters.")]
        public string TimeOfCreation { get; set; }
    #nullable enable
        [Column(TypeName = "varchar(500)")]
        [StringLength(500, ErrorMessage = "The description cannot exceed 500 characters.")]
        public string? ProfileDescription { get; set; }
    #nullable disable
        [Required(ErrorMessage = "No user id present. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The user id should not exceed 100 characters.")]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public UserModel User { get; set; }
    }
}
