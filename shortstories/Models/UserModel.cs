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
        public UserModel(string userUsername, string userPassword, string profileModelId)
        {
            string UUID = Guid.NewGuid().ToString();
            UserModelId = UUID;
            TimeOfCreation = DateTime.UtcNow.ToString();
            UserUsername = userUsername;
            UserPassword = userPassword;
            ProfileModelId = profileModelId;
        }
        [Key]
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string UserModelId { get; }
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string TimeOfCreation { get; }
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string UserUsername { get; set; }
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string UserPassword { get; set; }
        [ForeignKey("ProfileModelId")]
        [Required]
        [Column(TypeName = "VARCHAR")]
        [StringLength(100)]
        public string ProfileModelId { get; }
    }
}
