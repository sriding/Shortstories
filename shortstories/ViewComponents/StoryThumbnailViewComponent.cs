using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using shortstories.Models;

namespace shortstories.ViewComponents
{
    public class StoryThumbnailViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(StoryModel storyData)
        {
            return View("Default", storyData);
        }
    }
}