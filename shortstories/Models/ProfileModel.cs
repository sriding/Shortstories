using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
            ProfileDescription = profileDescription;
        }
        [Key]
        public string ProfileModelId { get; set; }
        public string ProfileDescription { get; set; }
    }
}
