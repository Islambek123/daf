using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCore.DAL.Entites.Products
{
    public class ProductEntity
    {
        [Key]
        public int Id { get; set; }
        [Required, MinLength(length: 1), MaxLength(length: 256)]
        public string Name { get; set; }
        [Required, MaxLength(length: 2041)]
        public string Description { get; set; }
        [Required, MinLength(length: 1), MaxLength(length: 256)]
        public string Manufactor { get; set; }
        [Required]
        public string Available { get; set; }
        [Required]
        public string Image { get; set; }
    }
}
