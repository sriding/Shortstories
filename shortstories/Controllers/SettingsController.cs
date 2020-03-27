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

        public IActionResult Index()
        {
            return View();
        }
    }
}