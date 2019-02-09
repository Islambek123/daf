using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCore.DAL.Entites
{
    public class EFDbContext : IdentityDbContext<IdentityUser>
    {
        public EFDbContext(DbContextOptions<EFDbContext> options)
            : base(options)
        {
               
        }
    }
}
