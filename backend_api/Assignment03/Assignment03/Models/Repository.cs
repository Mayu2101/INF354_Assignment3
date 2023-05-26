using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment03.Models
{
    public class Repository: IRepository
    {
        private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<Product[]> GetProductsDashboardReportAsync()
        {
            IQueryable<Product> query = _appDbContext.Products.Include(p => p.Brand).Include(p => p.ProductType);

            return await query.ToArrayAsync();
        }
    }
}
