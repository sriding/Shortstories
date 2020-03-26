using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using shortstories.Data;
using shortstories.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace shortstories.Controllers.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoryModelsController : ControllerBase
    {
        private readonly ShortstoriesContext _context;

        public StoryModelsController(ShortstoriesContext context)
        {
            _context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<dynamic>> GetStories()
        {
            var stories = await _context.Story.ToListAsync();
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<dynamic>> GetStory(int id)
        {
            StoryModel story = await _context.Story.FindAsync(id);

            if (story == null)
            {
                return NotFound();
            }

            return Ok(JsonConvert.SerializeObject(story));
        }

        [HttpGet("profile/{profileId}")]
        public async Task<dynamic> GetProfileStories(string profileId)
        {
            List<StoryModel> stories = await _context.Story.Where(a => a.ProfileId == profileId).Take(16).ToListAsync();

            if (stories == null)
            {
                return NotFound();
            }

            return JsonConvert.SerializeObject(stories);
        }

        // GET api/<controller>/5
        [HttpGet("filter/{filterText}")]
        public async Task<ActionResult<dynamic>> GetGenreStories(string filterText)
        {
            dynamic dynamoObject = new ExpandoObject();

            switch (filterText)
            {
                case "Random":
                    try
                    {
                        Random rand = new Random();
                        int toSkip = rand.Next(1, _context.Story.Count());

                        List<StoryModel> randomStories = await _context.Story.Skip(toSkip).Take(16).ToListAsync();
                        if (randomStories == null)
                        {
                            dynamoObject.stories = new List<StoryModel>();
                            dynamoObject.genres = new List<List<StoryGenresModel>>();
                            return NotFound(dynamoObject);
                        }
                        List<List<StoryGenresModel>> randomGenres = new List<List<StoryGenresModel>>();

                        foreach (StoryModel story in randomStories)
                        {
                            List<StoryGenresModel> randomGenre = await _context.StoryGenres.Where(a => a.StoryId == story.StoryModelId).ToListAsync();
                            randomGenres.Add(randomGenre);
                        }

                        dynamoObject.genres = randomGenres;
                        dynamoObject.stories = randomStories;

                        return JsonConvert.SerializeObject(dynamoObject);
                    } catch (Exception e)
                    {
                        return JsonConvert.SerializeObject(e);
                    }

                case "New":
                    try
                    {
                        List<StoryModel> newStories = await _context.Story.Take(16).ToListAsync();
                        if (newStories == null)
                        {
                            dynamoObject.stories = new List<StoryModel>();
                            dynamoObject.genres = new List<List<StoryGenresModel>>();
                            return NotFound(dynamoObject);
                        }
                        var newGenres = new List<List<StoryGenresModel>>();

                        foreach (StoryModel story in newStories)
                        {
                            List<StoryGenresModel> newGenre = await _context.StoryGenres.Where(b => b.StoryId == story.StoryModelId).ToListAsync();
                            newGenres.Add(newGenre);
                        }

                        dynamoObject.genres = newGenres;
                        dynamoObject.stories = newStories;

                        return JsonConvert.SerializeObject(dynamoObject);
                    } catch(Exception e)
                    {
                        return JsonConvert.SerializeObject(e);
                    }
                default:
                    try
                    {
                        var defaultGenres = await _context.StoryGenres.Where(a => a.StoryGenre == char.ToUpper(filterText[0]) + filterText.Substring(1)).Take(16).ToListAsync();
                        if (defaultGenres == null)
                        {
                            dynamoObject.stories = new List<StoryModel>();
                            dynamoObject.genres = new List<List<StoryGenresModel>>();
                            return NotFound(dynamoObject);
                        }
                        var defaultStories = new List<StoryModel>();
                        if (defaultStories == null)
                        {
                            dynamoObject.stories = new List<StoryModel>();
                            dynamoObject.genres = new List<List<StoryGenresModel>>();
                            return NotFound(dynamoObject);
                        }

                        foreach (StoryGenresModel genre in defaultGenres)
                        {
                            StoryModel story = await _context.Story.Where(c => c.StoryModelId == genre.StoryId).SingleOrDefaultAsync();
                            defaultStories.Add(story);
                        }

                        List<List<StoryGenresModel>> returnGenres = new List<List<StoryGenresModel>>();

                        foreach (StoryModel story in defaultStories)
                        {
                            List<StoryGenresModel> genres = await _context.StoryGenres.Where(d => d.StoryId == story.StoryModelId).ToListAsync();
                            returnGenres.Add(genres);
                        }

                        dynamoObject.genres = returnGenres;
                        dynamoObject.stories = defaultStories;

                        return JsonConvert.SerializeObject(dynamoObject);
                    } catch(Exception e)
                    {
                        return JsonConvert.SerializeObject(e);
                    }
            }
        }

        [HttpGet("filter/followers/{profileId}")]
        [Authorize]
        public async Task<ActionResult<dynamic>> GetFollowersStories(string profileId)
        {
            try
            {
                dynamic dynamoObject = new ExpandoObject();

                List<FollowersModel> followers = await _context.Followers.Where(a => a.ProfileId == profileId).ToListAsync();
                if (followers == null)
                {
                    dynamoObject.stories = new List<StoryModel>();
                    dynamoObject.genres = new List<List<StoryGenresModel>>();
                    return NotFound(dynamoObject);
                }
                List<List<StoryModel>> stories = new List<List<StoryModel>>();
                if (stories == null)
                {
                    dynamoObject.stories = new List<StoryModel>();
                    dynamoObject.genres = new List<List<StoryGenresModel>>();
                    return NotFound(dynamoObject);
                }

                foreach (FollowersModel follower in followers)
                {
                    var storyList = await _context.Story.Where(b => b.ProfileId == follower.FollowersId).ToListAsync();
                    stories.Add(storyList);
                }

                List<List<StoryGenresModel>> genres = new List<List<StoryGenresModel>>();

                foreach (List<StoryModel> storyList in stories)
                {
                    foreach (StoryModel story in storyList)
                    {
                        var genreList = await _context.StoryGenres.Where(c => c.StoryId == story.StoryModelId).ToListAsync();
                        genres.Add(genreList);
                    }
                }

                dynamoObject.genres = genres;
                dynamoObject.stories = stories;

                return JsonConvert.SerializeObject(dynamoObject);
            } catch (Exception e)
            {
                return JsonConvert.SerializeObject(e);
            }
        }

        [HttpGet("filter/profile/{profileUsername}")]
        public async Task<ActionResult<dynamic>> GetStoryCardInformation(string profileUsername)
        {
            try
            {
                dynamic dynamoObject = new ExpandoObject();

                ProfileModel profile = await _context.Profile.Where(a => a.ProfileUsername == profileUsername).SingleOrDefaultAsync();
                if (profile == null)
                {
                    dynamoObject.stories = new List<StoryModel>();
                    dynamoObject.genres = new List<List<StoryGenresModel>>();
                    return NotFound(dynamoObject);
                }
                List<StoryModel> stories = await _context.Story.Where(b => b.ProfileId == profile.ProfileModelId).ToListAsync();
                if (stories == null)
                {
                    dynamoObject.stories = new List<StoryModel>();
                    dynamoObject.genres = new List<List<StoryGenresModel>>();
                    return NotFound(dynamoObject);
                }
                List<List<StoryGenresModel>> genres = new List<List<StoryGenresModel>>();

                foreach (StoryModel story in stories)
                {
                    List<StoryGenresModel> genre = await _context.StoryGenres.Where(c => c.StoryId == story.StoryModelId).ToListAsync();
                    genres.Add(genre);
                }

                dynamoObject.genres = genres;
                dynamoObject.stories = stories;

                return JsonConvert.SerializeObject(dynamoObject);
            } catch (Exception e)
            {
                return JsonConvert.SerializeObject(e);
            }
        }

        // POST api/<controller>
        [HttpPost("create")]
        public async Task<ActionResult<StoryModel>> CreateStory([FromBody] StoryModel story)
        {
            _context.Story.Add(story);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return Ok(story.StoryModelId);
        }

        // PUT api/<controller>/5
        [HttpPut("{userId}/{id}")]
        [Authorize]
        public async Task<IActionResult> PutStory([FromRoute] string userId, [FromRoute] int id, [FromBody] StoryModel updatedStory)
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

                StoryModel story = await _context.Story.Where(b => b.ProfileId == profile.ProfileModelId).Where(c => c.StoryModelId == id).SingleOrDefaultAsync();

                if (story == null)
                {
                    return NotFound();
                }

                story.StoryTitle = updatedStory.StoryTitle;
                story.StoryHeadline = updatedStory.StoryHeadline;
                story.StoryContent = updatedStory.StoryContent;

                _context.Entry(story).State = EntityState.Modified;

                await _context.SaveChangesAsync();
            } catch(Exception e)
            {
                throw;
            }

            return Ok(new { Response = "Okay." });
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteAStory([FromRoute] int id, [FromBody] UserModel user)
        {
            try
            {
                var userExists = await _context.User.Where(a => a.UserModelId == user.UserModelId).Where(b => b.FirebaseUserId == user.FirebaseUserId).SingleOrDefaultAsync();

                if (userExists == null)
                {
                    return NotFound();
                }

                var profile = await _context.Profile.Where(c => c.UserId == userExists.UserModelId).SingleOrDefaultAsync();

                if (profile == null)
                {
                    return NotFound();
                }

                var story = await _context.Story.Where(d => d.ProfileId == profile.ProfileModelId).Where(e => e.StoryModelId == id).SingleOrDefaultAsync();

                if (story == null)
                {
                    return NotFound();
                }

                _context.Story.Remove(story);

                await _context.SaveChangesAsync();

                return Ok();
            } catch(Exception e)
            {
                return Problem(e.ToString());
            }
        }
    }
}
