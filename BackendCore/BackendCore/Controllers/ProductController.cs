using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BackendCore.DAL.Entites;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendCore.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    [Produces("application/json")]
    [Route("api/Account")]
    public class ProductController : ControllerBase
    {
        private readonly EFDbContext _context;

        public IActionResult Delete(int id)
        {
            try
            {
                var game = _context.Products
                    .SingleOrDefault(g => g.Id == id);
                if (game != null)
                {
                    _context.Products.Remove(game);
                    _context.SaveChanges();
                }
                //return Content(HttpStatusCode.OK, new { success = true });
                return new OkObjectResult("Result: {0}" + new { success = true });
            }
            catch (Exception ex)
            {
                return new ObjectResult("Result: {0}" + new { errors = new { global = ex.Message } });
                //return Content(HttpStatusCode.InternalServerError,
                //    new { errors = new { global = ex.Message } });
            }




        }
    }
}