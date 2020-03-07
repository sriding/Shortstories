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

        // PUT: api/StoryTagsModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStoryTagsModel(int id, StoryTagsModel storyTagsModel)
        {
            if (id != storyTagsModel.StoryTagsId)
            {
                return BadRequest();
            }

            _context.Entry(storyTagsModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StoryTagsModelExists(id))
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
