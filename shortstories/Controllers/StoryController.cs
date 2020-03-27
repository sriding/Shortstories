using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortstories.Data;
using shortstories.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shortstories.Controllers
{
    public class StoryController : Controller
    {
        private readonly ShortstoriesContext _context;

        public StoryController(ShortstoriesContext context)
        {
            _context = context;
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Create()
        {
            return View();
        }

        public async Task<IActionResult> Edit(string userId, int storyId)
        {
            UserModel user = await _context.User.FindAsync(userId);

            if (user == null)
            {
                return Redirect("/");
            }

            ProfileModel profile = await _context.Profile.Where(a => a.UserId == userId).SingleOrDefaultAsync();

            if (profile == null)
            {
                return Redirect("/");
            }

            StoryModel story = await _context.Story.Where(b => b.StoryModelId == storyId).Where(c => c.ProfileId == profile.ProfileModelId).SingleOrDefaultAsync();

            if (story == null)
            {
                return Redirect("/");
            }

            return View("~/Views/Story/Edit.cshtml", story.StoryModelId);
        }

        [HttpGet("{controller}/{action}/{id:int}")]
        public async Task<IActionResult> Display(int id)
        {
            var story = await _context.Story.FindAsync(id);

            if (story == null)
            {
                return Redirect("/");
            }

            var profile = await _context.Profile.Where(a => a.ProfileModelId == story.ProfileId).SingleOrDefaultAsync();

            if (profile == null)
            {
                return Redirect("/");
            }

            List<StoryGenresModel> storyGenres = await _context.StoryGenres.Where(a => a.StoryId == story.StoryModelId).ToListAsync();
            List<StoryTagsModel> storyTags = await _context.StoryTags.Where(b => b.StoryId == story.StoryModelId).ToListAsync();

            dynamic storyInformation = new ExpandoObject();

            storyInformation.profile = profile;

            storyInformation.story = story;
            storyInformation.tags = storyTags;
            storyInformation.genres = storyGenres;

            if (story.StoryContent != null && story.StoryContent != "")
            {
                return View("~/Views/Story/Display.cshtml", storyInformation);
            } else
            {
                List<StoryChaptersModel> storyChapters = await _context.StoryChapters.Where(c => c.StoryId == story.StoryModelId).OrderBy(d => d.ChapterNumber).ToListAsync();
                storyInformation.chapters = storyChapters;

                return View("~/Views/Story/Display.cshtml", storyInformation);
            }
        }
    }
}
