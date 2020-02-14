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

        // GET: api/UserModels
        /*[HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }
        */

        // GET: api/UserModels/{id}
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserModel>> RetrieveAUser(string id)
        {
            var userModel = await _context.User.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
        }

        // PUT: api/UserModels/{id}
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("update/username/{id}")]
        public async Task<IActionResult> UpdateUserUsername(string id, [FromBody] System.Text.Json.JsonElement jsonData)
        {
            string jsonDataUsername = jsonData.GetProperty("userUsername").ToString();

            var userModel = await _context.User.FindAsync(id);
            userModel.UserUsername = jsonDataUsername;

            if (userModel == null)
            {
                return NotFound();
            } else if (userModel.UserModelId != id)
            {
                return BadRequest();
            }

            _context.Entry(userModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
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

        [HttpPut("update/password/{id}")]
        public async Task<IActionResult> UpdateUserPassword(string id, [FromBody] System.Text.Json.JsonElement jsonData)
        {
            string jsonDataPassword = jsonData.GetProperty("userPassword").ToString();

            var userModel = await _context.User.FindAsync(id);
            userModel.UserPassword = jsonDataPassword;

            if (userModel == null)
            {
                return NotFound();
            }
            else if (userModel.UserModelId != id)
            {
                return BadRequest();
            }

            _context.Entry(userModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserModelExists(id))
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

        // POST: api/UserModels
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost("register")]
        public async Task<ActionResult<UserModel>> RegisterAUser([FromBody] System.Text.Json.JsonElement jsonData)
        {
            string jsonDataUsername = jsonData.GetProperty("userUsername").ToString();
            string jsonDataPassword = jsonData.GetProperty("userPassword").ToString();

            UserModel userModel = new UserModel(jsonDataUsername, jsonDataPassword);
            _context.User.Add(userModel);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                
                if (UserModelExists(userModel.UserModelId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUserModel", new { id = userModel.UserModelId }, userModel);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserModel>> LoginAUser([FromBody] System.Text.Json.JsonElement jsonData)
        {
            string jsonDataUsername = jsonData.GetProperty("userUsername").ToString();
            string jsonDataPassword = jsonData.GetProperty("userPassword").ToString();

            var userModel = await _context.User.Where(o => o.UserUsername == jsonDataUsername).Where(p => p.UserPassword == jsonDataPassword).FirstOrDefaultAsync();

            if (userModel == null)
            {
                return BadRequest();
            }

            return userModel;
        }

        // DELETE: api/UserModels/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserModel>> DeleteAUser(string id, [FromBody] System.Text.Json.JsonElement jsonData)
        {
            if (jsonData.Equals(null))
            {
                return NotFound();
            }

            string password = jsonData.GetProperty("userPassword").ToString();

            var userModel = await _context.User.Where(o => o.UserPassword == password).Where(p => p.UserModelId == id).FirstOrDefaultAsync();
            System.Diagnostics.Debug.WriteLine("LOOK UNDER");
            System.Diagnostics.Debug.WriteLine(userModel);
            if (userModel == null)
            {
                return NotFound();
            }

            if (userModel.UserPassword == password)
            {
                _context.User.Remove(userModel);
                await _context.SaveChangesAsync();
            }

            return userModel;
        }

        private bool UserModelExists(string id)
        {
            return _context.User.Any(e => e.UserModelId == id);
        }
    }
}
