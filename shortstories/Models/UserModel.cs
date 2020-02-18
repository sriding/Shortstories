using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace shortstories.Models
{
    public class UserModel
    {
        public UserModel()
        {
            UserModelId = Guid.NewGuid().ToString();
        }
        [Required(ErrorMessage = "No user id for the user. This should be automatic.")]
        [Key]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The length of the user id cannot exceed 100 characters. This should be automatic.")]
        public string UserModelId { get; set; }

        string _FirebaseUserId;
        [Required]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The length of the firebase uid cannot exceed 100 characters. This should be automatic.")]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "Firebase uid regex issue. This should be automatic.")]
        public string FirebaseUserId { 
            get { return _FirebaseUserId; }
            set
            {
                _FirebaseUserId = HttpUtility.HtmlEncode(value);
            }
        }
    }
}
