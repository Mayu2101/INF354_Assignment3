using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment03.Models
{
    public class Product: BaseEntity
    {
        public int ProductId { get; set; }

        [Column(TypeName = "decimal(18,3)")]
        public decimal Price { get; set; }
        public virtual ProductType ProductType { get; set; }
        public  virtual Brand Brand { get; set; }
    }
}
