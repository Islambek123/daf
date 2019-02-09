using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCore.ViewModels
{
    public class SignupBindingModel
    {
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Timezone { get; set; }
        public string Password { get; set; }
        public string PasswordConfirmation { get; set; }

    }
    public class ErrorsSignupBindingModel
    {
        public string email { get; set; }
        public string username { get; set; }
        public string timezone { get; set; }
        public string password { get; set; }
        public string passwordConfirmation { get; set; }
    }
}
