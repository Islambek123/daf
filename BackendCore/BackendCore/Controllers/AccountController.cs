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
        [HttpGet("user")]
        public ActionResult<AccountCredentials> GetUser()
        {
            var id = User.FindFirst("id").Value;
            var _user = _context.Users.SingleOrDefault(u => u.Id == id);
            AccountCredentials user = new AccountCredentials
            {
                UserName = _user.UserName
            };
            return user;
        }
        [HttpPost("token")]
        public ActionResult ValidateToken(string token)
        {
            return Ok();
        }
    }
}