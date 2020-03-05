using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortstories.Data;

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
                var profile = await _context.Profile.SingleAsync(o => o.ProfileUsername == id);

                if (profile == null)
                {
                    return Redirect("/");
                }

                return View("~/Views/Profile/Index.cshtml", profile);
            }
            catch
            {
                return Redirect("/");
            }
        }
    }
}
