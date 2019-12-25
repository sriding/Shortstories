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
        public UserModel(string userUsername, string userPassword, string userProfileId)
        {
            string UUID = Guid.NewGuid().ToString();
            UserModelId = UUID;
            TimeOfCreation = DateTime.UtcNow.ToString();
            UserUsername = userUsername;
            UserPassword = userPassword;
            UserProfileId = userProfileId;
        }
        [Key]
        public string UserModelId { get; set; }
        public string TimeOfCreation { get; set; }
        public string UserUsername { get; set; }
        public string UserPassword { get; set; }
        [ForeignKey("ProfileModel")]
        public string UserProfileId { get; set; }
    }
}
