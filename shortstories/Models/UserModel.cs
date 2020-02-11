using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class UserModel
    {
        public UserModel(string userUsername, string userPassword)
        {
            UserModelId = Guid.NewGuid().ToString();
            TimeOfCreation = DateTime.UtcNow.ToString();
            UserUsername = userUsername;
            UserPassword = userPassword;
        }
        [Required(ErrorMessage = "No user id for the user. This should be automatic.")]
        [Key]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The length of the user id cannot exceed 100 characters.")]
        public string UserModelId { get; set; }

        [Required(ErrorMessage = "No time of creation for the user. This should be automatic.")]
        [Column(TypeName = "varchar(100)")]
        [StringLength(100, ErrorMessage = "The length of the time of creationg cannot exceed 100 characters.")]
        public string TimeOfCreation { get; set; }

        [Required(ErrorMessage = "A username is required.")]
        [Column(TypeName = "varchar(25)")]
        [StringLength(25, ErrorMessage = "The length of the username cannot exceed 25 characters.")]
        public string UserUsername { get; set; }

        [Required(ErrorMessage = "A password is required.")]
        [Column(TypeName = "varchar(25)")]
        [StringLength(25, ErrorMessage = "The length of the password cannot exceed 25 characters.")]
        public string UserPassword { get; set; }
    }
}
