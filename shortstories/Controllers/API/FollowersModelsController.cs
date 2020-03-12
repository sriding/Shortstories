using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortstories.Data;
using shortstories.Models;

namespace shortstories.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowersModelsController : ControllerBase
    {
        private readonly ShortstoriesContext _context;

        public FollowersModelsController(ShortstoriesContext context)
        {
            _context = context;
        }

        // GET: api/FollowersModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FollowersModel>>> GetFollowers()
        {
            return await _context.Followers.ToListAsync();
        }

        // GET: api/FollowersModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FollowersModel>> GetFollowersModel(int id)
        {
            var followersModel = await _context.Followers.FindAsync(id);

            if (followersModel == null)
            {
                return NotFound();
            }

            return followersModel;
        }

        // PUT: api/FollowersModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFollowersModel(int id, FollowersModel followersModel)
        {
            if (id != followersModel.FollowersModelId)
            {
                return BadRequest();
            }

            _context.Entry(followersModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FollowersModelExists(id))
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

        // POST: api/FollowersModels
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FollowersModel>> PostFollowersModel(FollowersModel followersModel)
        {
            _context.Followers.Add(followersModel);
            await _context.SaveChangesAsync();

            return Ok("Follower Added.");
        }

        // DELETE: api/FollowersModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FollowersModel>> DeleteFollowersModel(int id)
        {
            var followersModel = await _context.Followers.FindAsync(id);
            if (followersModel == null)
            {
                return NotFound();
            }

            _context.Followers.Remove(followersModel);
            await _context.SaveChangesAsync();

            return followersModel;
        }

        private bool FollowersModelExists(int id)
        {
            return _context.Followers.Any(e => e.FollowersModelId == id);
        }
    }
}
