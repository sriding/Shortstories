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
    public class UserModelsController : ControllerBase
    {
        private readonly ShortstoriesContext _context;

        public UserModelsController(ShortstoriesContext context)
        {
            _context = context;
        }

        // Path: api/UserModels/login/{firebaseUserId}
        [HttpGet("login/{firebaseUserId}")]
        [Authorize]
        public async Task<ActionResult<UserModel>> Login([FromRoute] string firebaseUserId)
        {
            var userModel = await _context.User.Where(p => p.FirebaseUserId == firebaseUserId).FirstOrDefaultAsync();

            if (userModel == null)
            {
                return NotFound();
            } else
            {
                return Ok(userModel.UserModelId);
            }
        }

        [HttpGet("{firebaseUserId}/{userId}")]
        [Authorize]
        public async Task<ActionResult<UserModel>> VerifyAUser([FromRoute] string firebaseUserId, [FromRoute] string userId)
        {
            var userModel = await _context.User.Where(o => o.UserModelId == userId).Where(p => p.FirebaseUserId == firebaseUserId).FirstOrDefaultAsync();

            if (userModel == null)
            {
                return NotFound();
            }
            else
            {
                var profileModel = await _context.Profile.Where(o => o.UserId == userModel.UserModelId).FirstOrDefaultAsync();
                if (profileModel == null)
                {
                    return NotFound();
                } else
                {
                    return Ok(profileModel.ProfileUsername);
                }
            }
        }

        // POST: api/UserModels/register
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> RegisterAUser([FromBody] UserModel user)
        {
            _context.User.Add(user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {

                if (user == null)
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user.UserModelId);
        }

        // DELETE: api/UserModels/delete
        [HttpDelete("delete/{userId}/{firebaseUserId}")]
        [Authorize]
        public async Task<ActionResult<UserModel>> DeleteAUser([FromRoute] string userId, [FromRoute] string firebaseUserId)
        {

            var userModel = await _context.User.Where(o => o.UserModelId == userId).Where(p => p.FirebaseUserId == firebaseUserId).FirstOrDefaultAsync();
            
            if (userModel == null)
            {
                return NotFound();
            }

            if (userModel.UserModelId == userId && userModel.FirebaseUserId == firebaseUserId)
            {
                _context.User.Remove(userModel);
                await _context.SaveChangesAsync();
            }

            return userModel;
        }
    }
}
