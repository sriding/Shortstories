using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortstories.Data;
using shortstories.Models;

namespace shortstories.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoryChaptersModelsController : ControllerBase
    {
        private readonly ShortstoriesContext _context;

        public StoryChaptersModelsController(ShortstoriesContext context)
        {
            _context = context;
        }

        // GET: api/StoryChaptersModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryChaptersModel>>> GetStoryChapters()
        {
            return await _context.StoryChapters.ToListAsync();
        }

        // GET: api/StoryChaptersModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoryChaptersModel>> GetStoryChaptersModel(int id)
        {
            var storyChaptersModel = await _context.StoryChapters.FindAsync(id);

            if (storyChaptersModel == null)
            {
                return NotFound();
            }

            return storyChaptersModel;
        }

        // PUT: api/StoryChaptersModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoryChaptersModel(int id, StoryChaptersModel storyChaptersModel)
        {
            if (id != storyChaptersModel.StoryChaptersId)
            {
                return BadRequest();
            }

            _context.Entry(storyChaptersModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoryChaptersModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/StoryChaptersModels
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("create")]
        public async Task<ActionResult<StoryChaptersModel>> CreateStoryChapter(StoryChaptersModel storyChaptersModel)
        {
            _context.StoryChapters.Add(storyChaptersModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateException)
            {
                throw;
            }

            return Ok("Story chapter added.");
        }

        // DELETE: api/StoryChaptersModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StoryChaptersModel>> DeleteStoryChaptersModel(int id)
        {
            var storyChaptersModel = await _context.StoryChapters.FindAsync(id);
            if (storyChaptersModel == null)
            {
                return NotFound();
            }

            _context.StoryChapters.Remove(storyChaptersModel);
            await _context.SaveChangesAsync();

            return storyChaptersModel;
        }

        private bool StoryChaptersModelExists(int id)
        {
            return _context.StoryChapters.Any(e => e.StoryChaptersId == id);
        }
    }
}
