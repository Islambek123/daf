using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendCore.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BackendCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post(SignupBindingModel model)
        {
            bool isValid = true;
            ErrorsSignupBindingModel errors = new ErrorsSignupBindingModel();
            if(string.IsNullOrEmpty(model.UserName))
            {
                errors.username = "This field is required";
                isValid = false;
            }
            if (!isValid)
                return BadRequest(new { errors, isValid });

            return Ok(new { success=true });
            //return View();
        }
    }
}