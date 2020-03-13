using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortstories.Data;
using shortstories.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shortstories.Controllers
{
    public class ProfileController : Controller
    {
        private readonly ShortstoriesContext _context;

        public ProfileController(ShortstoriesContext context)
        {
            _context = context;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("{controller}/{action}/{id:regex(^[[a-zA-Z0-9_]]*$)}")]
        public async Task<IActionResult> GetProfile([FromRoute] string id)
        {
            try
            {
                dynamic profileAndStory = new ExpandoObject();
                var profile = await _context.Profile.SingleAsync(o => o.ProfileUsername == id);

                if (profile == null)
                {
                    return Redirect("/");
                }

                profileAndStory.Profile = profile;

                List<StoryModel> stories = await _context.Story.Where(o => o.ProfileId == profile.ProfileModelId).ToListAsync();
                
                if (stories == null)
                {
                    return Redirect("/");
                }

                List<List<StoryGenresModel>> genres = new List<List<StoryGenresModel>>();
                foreach (StoryModel story in stories)
                {
                    List<StoryGenresModel> tempGenreList = await _context.StoryGenres.Where(a => a.StoryId == story.StoryModelId).ToListAsync();
                    genres.Add(tempGenreList);
                }

                profileAndStory.stories = stories;
                profileAndStory.genres = genres;

                return View("~/Views/Profile/Index.cshtml", profileAndStory);
            }
            catch
            {
                return Redirect("/");
            }
        }
    }
}
