﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BackendCore.Controllers
{
    public class Credentials
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Captcha { get; set; }
    }
    [Produces("application/json")]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        readonly UserManager<IdentityUser> _userManager;
        readonly SignInManager<IdentityUser> _signInManager;
        public AuthController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]Credentials credentials)
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

            //return Ok(CreateToken(user));
            return Ok("User Created.");
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]Credentials credentials)
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