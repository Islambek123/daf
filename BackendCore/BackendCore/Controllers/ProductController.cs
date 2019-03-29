using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using BackendCore.DAL.Entites;
using BackendCore.DAL.Entites.Products;
using BackendCore.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols;

namespace BackendCore.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly EFDbContext _context;
        private readonly AppConfiguration _config;
        private string Path
        {
            get { return Path; }
            set { string.Format("{0}://{1}{2}", Request.Scheme, Request.Host, "/api/product/image/"); }
        }
        public ProductController(EFDbContext context, IOptions<AppConfiguration> config)
        {
            _context = context;
            _config = config.Value;
        }
        private Dictionary<string, string> GetErrorsByModel(ModelStateDictionary modelErrors)
        {
            var errors = new Dictionary<string, string>();

            var errorList = modelErrors
                .Where(x => x.Value.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()[0]
                );
            foreach (var item in errorList)
            {
                var key = item.Key.Split('.')[1];
                errors.Add(key, item.Value);
            }
            return errors;
        }
        [HttpGet("some")]
        public ActionResult<IEnumerable<HomeImages>> GetSome()
        {
            string path = string.Format("{0}://{1}{2}", Request.Scheme, Request.Host, "/api/product/image/");
            var folder = Url.Content("~") + _config.Path;

            var model = _context.Products
                .OrderByDescending(g => g.Id)
                .Select(g => new HomeImages
                {
                    Id = g.Id,
                    Name = g.Name,
                    Descriptions = g.Description,
                    Image = path + g.Image
                }).Take(4).ToList();
            return model;
        }
        [HttpGet]
        public ActionResult<IEnumerable<ProductEntity>> Get()
        {
            string path = string.Format("{0}://{1}{2}", Request.Scheme, Request.Host, "/api/product/image/");
            var folder = Url.Content("~") + _config.Path;

            var model = _context.Products
                .Select(g => new ProductEntity
                {
                    Id = g.Id,
                    Name = g.Name,
                    Description = g.Description,
                    Manufactor = g.Manufactor,
                    Available = g.Available,
                    Image = path + g.Image
                }).ToList();
            return model;
        }
        [AllowAnonymous]
        [HttpGet("image/{name}")]
        public IActionResult Get([FromRoute] string name)
        {
            var image = System.IO.File.OpenRead(_config.Path + name);
            return File(image, "image/jpeg");
        }
        [HttpGet("{id}")]
        public ActionResult<ProductEntity> Get(int id)
        {
            var model = new ProductEntity();
            var product = _context.Products.SingleOrDefault(g => g.Id == id);
            if (product != null)
            {
                var folder = Url.Content(_config.Path);
                model.Id = product.Id;
                model.Name = product.Name;
                model.Description = product.Description;
                model.Manufactor = product.Manufactor;
                model.Available = product.Available;
                model.Image = product.Image;
            }
            return model;
        }
        
        [HttpPost]
        public ActionResult<ProductViewModel> PostAdd([FromBody]ProductEntity model)
        {
            if (ModelState.IsValid)
            {
                string uniqueName = String.Empty;
                string imagePath = String.Empty;
                uniqueName = Guid.NewGuid().ToString() + ".jpeg";
                imagePath = _config.Path
                    + uniqueName;
                string base64 = model.Image.Split(',')[1];
                byte[] imageBytes = Convert.FromBase64String(base64);
                System.IO.File.WriteAllBytes(imagePath, imageBytes);
                ProductEntity product = new ProductEntity()
                {
                    Image = uniqueName,
                    Available = model.Available,
                    Manufactor = model.Manufactor,
                    Description = model.Description,
                    Name = model.Name
                };
                _context.Products.Add(product);
                _context.SaveChanges();

                var folder = Url.Content(_config.Path);
                var image = folder + uniqueName;
                ProductViewModel responseModel = new ProductViewModel()
                {
                    Id = product.Id,
                    Name = product.Name,
                    Description = product.Description,
                    Image = image,
                    Manufactor = product.Manufactor,
                    Available = product.Available
                };
                return responseModel;
            }

            //var errors = new ExpandoObject() as IDictionary<string, object>;
            var errors = GetErrorsByModel(ModelState);
            return BadRequest(errors);
        }
        [HttpPut("{id}")]
        public ActionResult<ProductViewModel> Put(int id, [FromBody]ProductViewModel model)
        {
            if (ModelState.IsValid)
            {
                string uniqueName = String.Empty;
                string imagePath = String.Empty;
                uniqueName = Guid.NewGuid().ToString() + ".jpeg";
                imagePath = _config.Path
                    + uniqueName;
                string base64 = model.Image.Split(',')[1];
                byte[] imageBytes = Convert.FromBase64String(base64);
                System.IO.File.WriteAllBytes(imagePath, imageBytes);
                var product = _context.Products
                    .SingleOrDefault(g => g.Id == model.Id);
                if (product != null)
                {
                    product.Name = model.Name;
                    product.Description = model.Description;
                    product.Available = model.Available;
                    product.Manufactor = model.Manufactor;
                    product.Image = uniqueName;
                    _context.SaveChanges();
                }
                return model;
            }

            var errors = GetErrorsByModel(ModelState);

            return BadRequest(errors);
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var product = _context.Products
                    .SingleOrDefault(g => g.Id == id);
                if (product != null)
                {
                    _context.Products.Remove(product);
                    _context.SaveChanges();
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}