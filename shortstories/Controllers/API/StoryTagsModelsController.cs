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
    public class StoryTagsModelsController : ControllerBase
    {
        private readonly ShortstoriesContext _context;

        public StoryTagsModelsController(ShortstoriesContext context)
        {
            _context = context;
        }

        // GET: api/StoryTagsModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StoryTagsModel>>> GetStoryTags()
        {
            return await _context.StoryTags.ToListAsync();
        }

        // GET: api/StoryTagsModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoryTagsModel>> GetStoryTagsModel(int id)
        {
            var storyTagsModel = await _context.StoryTags.FindAsync(id);

            if (storyTagsModel == null)
            {
                return NotFound();
            }

            return storyTagsModel;
        }

        [HttpGet("story/{storyId}")]
        public async Task<ActionResult<dynamic>> GetStoryTagsBasedOffStoryId(int storyId)
        {
            List<StoryTagsModel> storyTags = await _context.StoryTags.Where(a => a.StoryId == storyId).ToListAsync();

            if (storyTags == null)
            {
                return NotFound();
            }

            return Ok(JsonSerializer.Serialize(storyTags));
        }

        // PUT: api/StoryTagsModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{userId}/{storyId}")]
        public async Task<IActionResult> PutStoryTagsModel([FromRoute] string userId, [FromRoute] int storyId, [FromBody] List<StoryTagsModel> updatedStoryTags)
        {
            try {
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

                StoryModel story = await _context.Story.Where(b => b.ProfileId == profile.ProfileModelId).Where(c => c.StoryModelId == storyId).SingleOrDefaultAsync();

                if (story == null)
                {
                    return NotFound();
                }

                List<StoryTagsModel> storytags = await _context.StoryTags.Where(d => d.StoryId == story.StoryModelId).ToListAsync();

                if (storytags == null)
                {
                    return NotFound();
                }

                _context.StoryTags.RemoveRange(storytags);
                _context.StoryTags.AddRange(updatedStoryTags);

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return Ok(new { Response = "Okay." });
        }

        // POST: api/StoryTagsModels
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("create")]
        public async Task<ActionResult<StoryTagsModel>> CreateStoryTag(StoryTagsModel storyTagsModel)
        {
            _context.StoryTags.Add(storyTagsModel);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateException)
            {
                throw;
            }

            return Ok("Tag added.");
        }

        // DELETE: api/StoryTagsModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StoryTagsModel>> DeleteStoryTagsModel(int id)
        {
            var storyTagsModel = await _context.StoryTags.FindAsync(id);
            if (storyTagsModel == null)
            {
                return NotFound();
            }

            _context.StoryTags.Remove(storyTagsModel);
            await _context.SaveChangesAsync();

            return storyTagsModel;
        }

        private bool StoryTagsModelExists(int id)
        {
            return _context.StoryTags.Any(e => e.StoryTagsId == id);
        }
    }
}
