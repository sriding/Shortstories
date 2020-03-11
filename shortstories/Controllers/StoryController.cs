using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using shortstories.Data;

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

        [HttpGet("{controller}/{action}/{id:int}")]
        public async Task<IActionResult> Display(int id)
        {
            var story = await _context.Story.FindAsync(id);

            if (story == null)
            {
                return Redirect("/");
            }

            return View("~/Views/Story/Display.cshtml");
        }
    }
}
