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
    public class StoryGenresModelsController : ControllerBase
    {
        private readonly ShortstoriesContext _context;

        public StoryGenresModelsController(ShortstoriesContext context)
        {
            _context = context;
        }

        // GET: api/StoryGenresModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryGenresModel>>> GetStoryGenres()
        {
            return await _context.StoryGenres.ToListAsync();
        }

        // GET: api/StoryGenresModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoryGenresModel>> GetStoryGenresModel(int id)
        {
            var storyGenresModel = await _context.StoryGenres.FindAsync(id);

            if (storyGenresModel == null)
            {
                return NotFound();
            }

            return storyGenresModel;
        }

        // PUT: api/StoryGenresModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoryGenresModel(int id, StoryGenresModel storyGenresModel)
        {
            if (id != storyGenresModel.StoryGenresId)
            {
                return BadRequest();
            }

            _context.Entry(storyGenresModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoryGenresModelExists(id))
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

        // POST: api/StoryGenresModels
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("create")]
        public async Task<ActionResult<StoryGenresModel>> CreateStoryGenre(StoryGenresModel storyGenresModel)
        {
            _context.StoryGenres.Add(storyGenresModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateException)
            {
                throw;
            }

            return Ok("Genre added.");
        }

        // DELETE: api/StoryGenresModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StoryGenresModel>> DeleteStoryGenresModel(int id)
        {
            var storyGenresModel = await _context.StoryGenres.FindAsync(id);
            if (storyGenresModel == null)
            {
                return NotFound();
            }

            _context.StoryGenres.Remove(storyGenresModel);
            await _context.SaveChangesAsync();

            return storyGenresModel;
        }

        private bool StoryGenresModelExists(int id)
        {
            return _context.StoryGenres.Any(e => e.StoryGenresId == id);
        }
    }
}
