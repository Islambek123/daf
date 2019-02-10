using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCore.DAL.Entites.Products
{
    public class ProductEntity
    {
        [Required]
        public int Id { get; set; }
        [Required, MinLength(length: 1), MaxLength(length: 256)]
        public string Name { get; set; }
        [Required, MaxLength(length: 2041)]
        public string Description { get; set; }
    }
}
