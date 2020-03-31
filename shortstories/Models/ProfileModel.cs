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
        public string ProfileModelId { get; set; }

        [Required(ErrorMessage = "No time of creation for the profile. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The time of creation cannot exceed 100 characters. This should be automatic.")]
        public string TimeOfCreation { get; set; }

        string _ProfileUsername;
        [Required(ErrorMessage = "No username entered.")]
        [Column(TypeName = "varchar(25)")]
        [StringLength(25, ErrorMessage = "Username cannot exceed 25 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9_]*$", ErrorMessage = "Only alphanumerical characters and underlines are allowed.")]
        public string ProfileUsername { 
            get { return _ProfileUsername; }
            set
            {
                _ProfileUsername = HttpUtility.HtmlEncode(value);
            }
        }

        string _ProfileAvatar;
        [Required(ErrorMessage = "No avatar selected.")]
        [Column(TypeName = "varchar(25)")]
        [StringLength(25, ErrorMessage = "Avatar cannot exceed 25 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9_-]*$", ErrorMessage = "Only alphanumerical characters, spaces, and dashes are allowed.")]
        public string ProfileAvatar
        {
            get { return _ProfileAvatar; }
            set
            {
                _ProfileAvatar = HttpUtility.HtmlEncode(value);
            }
        }

        string _ProfileTypeOfWriter;
        [Column(TypeName = "varchar(25)")]
        [StringLength(25, ErrorMessage = "Should not exceed 25 characters. This should be automatic.")]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "Type of writer regex issue. This should be automatic.")]
        public string ProfileTypeOfWriter
        {
          get { return _ProfileTypeOfWriter; }
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
                        _ProfileTypeOfWriter = HttpUtility.HtmlEncode(value);
                        break;
                    default:
                        _ProfileTypeOfWriter = "Beginner";
                        break;
                }
            }
        }

    #nullable enable
        string? _ProfileDescription;
    #nullable disable
        [Column(TypeName = "varchar(500)")]
        [StringLength(500, ErrorMessage = "The description cannot exceed 500 characters.")]
        [RegularExpression(@"^[\x00-\x7F]+$", ErrorMessage = "Must use ASCII characters.")]
        public string ProfileDescription { 
            get { return _ProfileDescription; }
            set
            {
                _ProfileDescription = HttpUtility.HtmlEncode(value);
            }
        }

        string _UserId;
        [Required(ErrorMessage = "No user id present. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The user id should not exceed 100 characters.")]
        [RegularExpression(@"^[a-zA-Z0-9-]*$", ErrorMessage = "User id regex issue. This should be automatic.")]
        public string UserId {
            get { return _UserId; }
            set
            {
                _UserId = HttpUtility.HtmlEncode(value);
            }
        }

        [ForeignKey("UserId")]
        public UserModel User { get; set; }
    }
}
