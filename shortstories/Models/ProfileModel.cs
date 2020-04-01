using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace shortstories.Models
{
    public class ProfileModel
    {
        public ProfileModel()
        {
            ProfileModelId = Guid.NewGuid().ToString(); 
            TimeOfCreation = DateTime.UtcNow.ToString();
        }

        [Key]
        [Required(ErrorMessage = "No profile id for the profile. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The length of the profile id cannot exceed 100 characters. This should be automatic.")]
        [RegularExpression(@"^[a-zA-Z0-9-]*$", ErrorMessage = "Profile id regex issue. This should be automatic.")]
        public string ProfileModelId { get; set; }

        [Required(ErrorMessage = "No time of creation for the profile. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The time of creation cannot exceed 100 characters. This should be automatic.")]
        [RegularExpression(@"^[a-zA-Z0-9:\/ ]*$", ErrorMessage = "Time of creation regex issue. This should be automatic.")]
        public string TimeOfCreation { get; set; }

        [Required(ErrorMessage = "No username entered.")]
        [Column(TypeName = "varchar(25)")]
        [StringLength(25, ErrorMessage = "Username cannot exceed 25 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9_]*$", ErrorMessage = "Only alphanumerical characters and underlines are allowed.")]
        public string ProfileUsername { get; set; }

        [Required(ErrorMessage = "No avatar selected.")]
        [Column(TypeName = "varchar(25)")]
        [StringLength(25, ErrorMessage = "Avatar cannot exceed 25 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9_-]*$", ErrorMessage = "Only alphanumerical characters, underlines, and dashes are allowed. Should be automatic.")]
        //TODO: Specify the exact avatars available in a set method
        public string ProfileAvatar { get; set; }

        string _ProfileTypeOfWriter;
        [Column(TypeName = "varchar(25)")]
        [StringLength(25, ErrorMessage = "Should not exceed 25 characters. This should be automatic.")]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "Type of writer regex issue. Should be automatic.")]
        public string ProfileTypeOfWriter
        {
          get { return HttpUtility.HtmlEncode(_ProfileTypeOfWriter); }
          set
            {
                if (!(value is string) || string.IsNullOrEmpty(value))
                {
                    _ProfileTypeOfWriter = "Beginner";
                    return;
                }

                switch (char.ToUpper(value[0]) + value.Substring(1))
                {
                    case "Beginner":
                    case "Hobbyist":
                    case "Enthusiast":
                    case "Professional":
                        _ProfileTypeOfWriter = value;
                        break;
                    default:
                        _ProfileTypeOfWriter = "Beginner";
                        break;
                }
            }
        }

        [Column(TypeName = "varchar(500)")]
        [StringLength(500, ErrorMessage = "The description cannot exceed 500 characters.")]
        [RegularExpression(@"^((?![<>])[\x00-\x7F])*$", ErrorMessage = "No < or > characters, and must use ASCII.")]
#nullable enable
        public string? ProfileDescription { get; set; }
#nullable disable

        [Required(ErrorMessage = "No user id present. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The user id should not exceed 100 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9-]*$", ErrorMessage = "User id regex issue. This should be automatic.")]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public UserModel User { get; set; }
    }
}
