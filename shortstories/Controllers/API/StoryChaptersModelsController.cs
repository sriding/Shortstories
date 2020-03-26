using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortstories.Data;
using shortstories.Models;
using Microsoft.AspNetCore.Authorization;

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

        [HttpGet("story/{storyId}")]
        public async Task<ActionResult<StoryChaptersModel>> GetStoryChaptersFromStoryId(int storyId)
        {
            List<StoryChaptersModel> storyChapters = await _context.StoryChapters.Where(a => a.StoryId == storyId).OrderBy(b => b.ChapterNumber).ToListAsync();

            if (storyChapters == null)
            {
                return NotFound();
            }

            return Ok(JsonSerializer.Serialize(storyChapters));
        }

        // PUT: api/StoryChaptersModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{userId}/{storyId}")]
        [Authorize]
        public async Task<IActionResult> PutStoryChaptersModel([FromRoute] string userId, [FromRoute] int storyId, [FromBody] List<StoryChaptersModel> updatedStoryChapters)
        {
            try {
                UserModel user = await _context.User.FindAsync(userId);

                if (user == null)
                {
                    return NotFound();
                }

                ProfileModel profile = await _context.Profile.Where(a => a.UserId == userId).SingleOrDefaultAsync();

                if (profile == null)
                {
                    return NotFound();
                }

                StoryModel story = await _context.Story.Where(b => b.StoryModelId == storyId).Where(c => c.ProfileId == profile.ProfileModelId).SingleOrDefaultAsync();

                if (story == null)
                {
                    return NotFound();
                }

                List<StoryChaptersModel> storyChapters = await _context.StoryChapters.Where(e => e.StoryId == story.StoryModelId).ToListAsync();

                if (storyChapters == null)
                {
                    return NotFound();
                }

                _context.StoryChapters.RemoveRange(storyChapters);

                _context.StoryChapters.AddRange(updatedStoryChapters);

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(new { Response = "Okay." });
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
