using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
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
    public class ProfileModelsController : ControllerBase
    {
        private readonly ShortstoriesContext _context;

        public ProfileModelsController(ShortstoriesContext context)
        {
            _context = context;
        }

        // GET: api/ProfileModels/{userId}
        [HttpGet("id/{userId}")]
        [Authorize]
        public async Task<ActionResult<ProfileModel>> GetProfileId([FromRoute] string userId)
        {
            var profile = await _context.Profile.SingleAsync(a => a.UserId == userId);

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(new { pid = profile.ProfileModelId });
        }

        [HttpGet("username/{profileId}")]
        [Authorize]
        public async Task<ActionResult<ProfileModel>> GetProfileUsername([FromRoute] string profileId)
        {
            var profile = await _context.Profile.SingleAsync(a => a.ProfileModelId == profileId);

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(new { pUsername = profile.ProfileUsername });
        }

        [HttpGet("avatar/{profileId}")]
        public async Task<ActionResult<ProfileModel>> GetProfileAvatar([FromRoute] string profileId)
        {
            var profile = await _context.Profile.SingleAsync(a => a.ProfileModelId == profileId);

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(new { pAvatar = profile.ProfileAvatar });
        }

        [HttpGet("writer/{profileId}")]
        public async Task<ActionResult<ProfileModel>> GetProfileWriterLabel([FromRoute] string profileId)
        {
            var profile = await _context.Profile.SingleAsync(a => a.ProfileModelId == profileId);

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(new { pWriter = profile.ProfileTypeOfWriter });
        }

        [HttpGet("description/{profileId}")]
        public async Task<ActionResult<ProfileModel>> GetProfileDescription([FromRoute] string profileId)
        {
            var profile = await _context.Profile.SingleAsync(a => a.ProfileModelId == profileId);

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(new { pDescription = profile.ProfileDescription });
        }

        // GET: api/ProfileModels/{profileUsername}
        [HttpGet("{profileUsername}")]
        public async Task<ActionResult<ProfileModel>> GetProfile(string profileUsername)
        {
            var profile = await _context.Profile.SingleAsync(a => a.ProfileUsername == profileUsername);

            if (profile == null)
            {
                return NotFound();
            }


            return new JsonResult(new { username = profile.ProfileUsername, typeOfWriter = profile.ProfileTypeOfWriter, description = profile.ProfileDescription });
        }

        // POST: api/ProfileModels
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ProfileModel>> PostProfileModel([FromBody] ProfileModel profile)
        {
            _context.Profile.Add(profile);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return Ok(new { pid = profile.ProfileModelId });
        }

        [HttpPut("update/avatar/{userId}/{avatar}")]
        [Authorize]
        public async Task<IActionResult> PutProfileAvatar([FromRoute] string userId, [FromRoute] string avatar)
        {
            var profileModel = await _context.Profile.Where(a => a.UserId == userId).SingleOrDefaultAsync();

            if (profileModel == null)
            {
                return BadRequest();
            }

            profileModel.ProfileAvatar = avatar.Trim();

            _context.Entry(profileModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (profileModel == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { });
        }

        // PUT: api/ProfileModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("update/type-of-writer/{userId}/{profileTypeOfWriter}")]
        [Authorize]
        public async Task<IActionResult> PutProfileTypeOfWriter([FromRoute] string userId, [FromRoute] string profileTypeOfWriter)
        {
            var profileModel = await _context.Profile.Where(a => a.UserId == userId).SingleOrDefaultAsync();

            if (profileModel == null)
            {
                return BadRequest();
            }

            profileModel.ProfileTypeOfWriter = profileTypeOfWriter.Trim();

            _context.Entry(profileModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (profileModel == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { });
        }

        [HttpPut("update/description/{userId}/{profileDescription}")]
        [Authorize]
        public async Task<IActionResult> PutProfileDescription([FromRoute] string userId, [FromRoute] string profileDescription)
        {
            var profileModel = await _context.Profile.Where(a => a.UserId == userId).SingleOrDefaultAsync();

            if (profileModel == null)
            {
                return BadRequest();
            }

            profileModel.ProfileDescription = profileDescription;

            _context.Entry(profileModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (profileModel == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { });
        }

        // DELETE: api/ProfileModels/5
        [HttpDelete("delete/{userId}")]
        [Authorize]
        public async Task<ActionResult<ProfileModel>> DeleteProfileModel(string userId)
        {
            var profileModel = await _context.Profile.SingleAsync(c => c.UserId == userId);

            if (profileModel == null)
            {
                return NotFound();
            }

            _context.Profile.Remove(profileModel);

            await _context.SaveChangesAsync();

            return Ok(new { });
        }
    }
}
