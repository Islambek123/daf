using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using BackendCore.DAL.Entites;
using BackendCore.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BackendCore.Controllers
{
    [Route("api/account")]
    [ApiController]
    [Produces("application/json")]
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly EFDbContext _context;
        readonly UserManager<IdentityUser> _userManager;
        public AccountController(EFDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        [HttpGet("getUser")]
        public async Task<IdentityUser> GetUser()
        {
            var infp = User.Claims;
            var user = await GetCurrentUserAsync();

            return user;
        }
        private Task<IdentityUser> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}