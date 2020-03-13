using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Logging;
using shortstories.Data;
using shortstories.Models;

namespace shortstories.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly ShortstoriesContext _context;

        public HomeController(ILogger<HomeController> logger, ShortstoriesContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            //Redo this since it will pull too many items into memory
            dynamic storiesWithGenres = new ExpandoObject();
            List<StoryModel> stories = await _context.Story.ToListAsync();
            List<List<StoryGenresModel>> genres = new List<List<StoryGenresModel>>();
            foreach(StoryModel story in stories)
            {
                List<StoryGenresModel> tempGenreList = await _context.StoryGenres.Where(a => a.StoryId == story.StoryModelId).ToListAsync();
                genres.Add(tempGenreList);
            }

            storiesWithGenres.stories = stories;
            storiesWithGenres.genres = genres;

            return View("~/Views/Home/Index.cshtml", storiesWithGenres);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
