using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using shortstories.Models;

namespace shortstories.ViewComponents
{
    public class StoryThumbnailViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke(StoryModel storyData, List<StoryGenresModel> genreData)
        {
            dynamic storiesWithGenres = new ExpandoObject();
            storiesWithGenres.stories = storyData;
            storiesWithGenres.genres = genreData;

            return View("Default", storiesWithGenres);
        }
    }
}