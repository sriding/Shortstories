using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortstories.Data;
using shortstories.Models;

namespace shortstories.Controllers
{
    public class SettingsController : Controller
    {
        private readonly ShortstoriesContext _context;
        public SettingsController(ShortstoriesContext context)
        {
            _context = context;
        }

        [HttpGet("{controller}/{action}/{id:regex(^[[a-zA-Z0-9-]]*$)}")]
        public async Task<IActionResult> GetSettings([FromRoute] string id)
        {
            try
            {
                ProfileModel profile = await _context.Profile.FindAsync(id);

                if (profile == null)
                {
                    return Redirect("/");
                }

                return View("~/Views/Settings/Index.cshtml", profile);

            } catch(Exception e)
            {
                return Redirect("/");
            }
        }
    }
}