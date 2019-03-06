using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BackendCore.Helpers;
using BackendCore.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BackendCore.Controllers
{
    [Produces("application/json")]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        readonly UserManager<IdentityUser> _userManager;
        readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppConfiguration _config;
        public AuthController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, IOptions<AppConfiguration> config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config.Value;
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterCredentials credentials)
        {
            if (ModelState.IsValid)
            {
                var user = new IdentityUser
                {
                    UserName = credentials.Email,
                    Email = credentials.Email
                };
                var result = await _userManager
                    .CreateAsync(user, credentials.Password);
                if (!result.Succeeded)
                    return BadRequest(result.Errors);
                await _signInManager.SignInAsync(user, isPersistent: false);
                
                return Ok("User Created.");
            }
            return BadRequest();
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginCredentials credentials)
        {

            var result = await _signInManager
            .PasswordSignInAsync(credentials.Email, credentials.Password,
            false, false);
            if (!result.Succeeded)
                return BadRequest(result.Succeeded);
            var user = await _userManager.FindByEmailAsync(credentials.Email);
            await _signInManager.SignInAsync(user, isPersistent: false);
            
            return Ok(CreateToken(user));

        }
        string CreateToken(IdentityUser user)
        {
            var claims = new Claim[]
            {
                new Claim("id", user.Id),
                new Claim("name", user.UserName),
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is the secret phrase"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var jwt = new JwtSecurityToken(signingCredentials: signingCredentials, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

    }
}