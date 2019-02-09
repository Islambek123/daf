using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace BackendCore.DAL.Entites
{
    public class SeederDB
    {
        public static void SeedData(UserManager<IdentityUser> userManager)
        {
            var email = "stas@gmail.com";
            var user= userManager.FindByEmailAsync(email).Result;
            if (user == null)
            {
                userManager.CreateAsync(new IdentityUser
                {
                    Email= email,
                    UserName = email

                }, "Qwerty1-");
            }
        }
    }
}
