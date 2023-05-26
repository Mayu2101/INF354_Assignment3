using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment03.Models
{
    public class ProductType: BaseEntity
    {
        public int ProductTypeId { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
