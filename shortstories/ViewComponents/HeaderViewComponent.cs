using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.ViewComponents
{
    public class HeaderViewComponent : ViewComponent
    {
        public HeaderViewComponent()
        {

        }
        public IViewComponentResult Invoke()
        {
            return View("Default");
        }
    }
}
