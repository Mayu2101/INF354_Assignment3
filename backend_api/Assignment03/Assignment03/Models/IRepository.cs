using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment03.Models
{
    public interface IRepository
    {
        Task<bool> SaveChangesAsync();
        Task<Product[]> GetProductsDashboardReportAsync();

    }
}
