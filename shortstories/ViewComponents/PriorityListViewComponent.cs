using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace shortstories.Views.ViewComponents
{
    public class PriorityListViewComponent : ViewComponent
    {
        private readonly string value;

        public PriorityListViewComponent(string testing)
        {
            value = testing;
        }

        public IViewComponentResult
            Invoke(string ratingControlType)
        {
            return View("Default", ratingControlType);
        }
    }
}