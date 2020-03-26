using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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

        [HttpGet("story/{storyId}")]
        public async Task<ActionResult<dynamic>> GetStoryGenresBasedOffStoryId(int storyId)
        {
            List<StoryGenresModel> storyGenres = await _context.StoryGenres.Where(a => a.StoryId == storyId).ToListAsync();

            if (storyGenres == null) {
                return NotFound();
            }

            return Ok(JsonSerializer.Serialize(storyGenres));
        }

        // PUT: api/StoryGenresModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{userId}/{storyId}")]
        public async Task<IActionResult> PutStoryGenresModel([FromRoute] string userId, [FromRoute] int storyId, [FromBody] List<StoryGenresModel> updatedStoryGenres)
        {
            try
            {
                UserModel user = await _context.User.FindAsync(userId);

                if (user == null)
                {
                    return NotFound();
                }

                ProfileModel profile = await _context.Profile.Where(a => a.UserId == user.UserModelId).SingleOrDefaultAsync();

                if (profile == null)
                {
                    return NotFound();
                }

                StoryModel story = await _context.Story.Where(b => b.StoryModelId == storyId).Where(c => c.ProfileId == profile.ProfileModelId).SingleOrDefaultAsync();

                if (story == null)
                {
                    return NotFound();
                }

                List<StoryGenresModel> storyGenres = await _context.StoryGenres.Where(d => d.StoryId == story.StoryModelId).ToListAsync();

                if (storyGenres == null)
                {
                    return NotFound();
                }

                _context.StoryGenres.RemoveRange(storyGenres);
                _context.StoryGenres.AddRange(updatedStoryGenres);

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(new { Response = "Okay." });
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
