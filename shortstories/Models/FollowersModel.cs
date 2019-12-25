using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Models
{
    public class FollowersModel
    {
        public FollowersModel(string profileId, string followersId)
        {
            FollowersModelId = -1;
            ProfileId = profileId;
            FollowersId = followersId;
        }
        [Key]
        public int FollowersModelId { get; set; }
        [ForeignKey("ProfileModel")]
        public string ProfileId { get; set; }
        public string FollowersId { get; set; }
    }
}
