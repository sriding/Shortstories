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
            var profile = await _context.Profile.SingleAsync(a => a.UserId == userId );

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(profile.ProfileModelId);
        }

        [HttpGet("username/{profileId}")]
        [Authorize]
        public async Task<ActionResult<ProfileModel>> GetProfileUsername([FromRoute] string profileId)
        {
            var profile = await _context.Profile.SingleAsync(a => a.ProfileUsername == profileId);

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(profile.ProfileUsername);
        }

        [HttpPost("avatar")]
        public ActionResult GetProfileAvatar([FromBody] JsonElement body)
        {
            string gravatarBaseUrl = "https://www.gravatar.com/avatar/";
            var jsonString = JsonSerializer.Serialize(body);
            var jsonDoc = JsonDocument.Parse(jsonString);
            var json = jsonDoc.RootElement.GetProperty("source").GetString();
            string jsonCleanedUp = json.Trim().ToLower();

            using (MD5 md5hash = MD5.Create())
            {
                try
                {
                    string hash = GetMd5Hash(md5hash, jsonCleanedUp);

                    return Ok(gravatarBaseUrl + hash);
                } catch
                {
                    throw;
                }
            }
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

            return Ok(profile.ProfileModelId);
        }

        // PUT: api/ProfileModels/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("update/type-of-writer/{userId}/{profileTypeOfWriter}")]
        [Authorize]
        public async Task<IActionResult> PutProfileTypeOfWriter([FromRoute] string userId, [FromRoute] string profileTypeOfWriter)
        {
            var profileModel = await _context.Profile.SingleAsync(a => a.UserId == userId);

            if (profileModel == null)
            {
                return BadRequest();
            }

            profileModel.ProfileTypeOfWriter = profileTypeOfWriter;

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

            return NoContent();
        }

        [HttpPut("update/description/{userId}/{profileDescription}")]
        [Authorize]
        public async Task<IActionResult> PutProfileDescription(string userId, string profileDescription)
        {
            var profileModel = await _context.Profile.SingleAsync(a => a.UserId == userId);

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

            return NoContent();
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

            return Ok("Profile deleted.");
        }

        static string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
    }
}
