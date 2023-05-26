using Assignment03.Models;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment03.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly IMapper _mapper;
        public ProductController(IRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetProductDashboard")]
        public async Task<ActionResult<dynamic>> GetProductDashboard()
        { 
            try
            {
                List<dynamic> productdashboard = new List<dynamic>();

                var results = await _repository.GetProductsDashboardReportAsync();

                dynamic brands = results
                             .GroupBy(p => p.Brand.Name)
                             .Select(b => new
                             {
                                 Key = b.Key,
                                 ProductCount = b.Count()
                             ,
                                 ProductTotalCost = Math.Round((double)b.Sum(p => p.Price), 2)
                             ,
                                 ProductAverageCost = Math.Round((double)b.Average(p => p.Price), 2)
                             });

                dynamic productTypes = results
                             .GroupBy(p => p.ProductType.Name)
                             .Select(pt => new
                             {
                                 Key = pt.Key,
                                 ProductCount = pt.Count()
                             ,
                                 ProductTotalCost = Math.Round((double)pt.Sum(p => p.Price), 2)
                             ,
                                 ProductAverageCost = Math.Round((double)pt.Average(p => p.Price), 2)
                             });

                dynamic productList = results.OrderByDescending(p => p.Price).Select(p => new
                {
                    ProductName = p.Name
                            ,
                    ProductPrice = Math.Round((double)p.Price, 2)
                            ,
                    ProductBrand = p.Brand.Name
                            ,
                    ProductType = p.ProductType.Name
                            ,
                    ProductDescription = p.Description
                })
                            .Take(10);

                productdashboard.Add(brands);
                productdashboard.Add(productTypes);
                productdashboard.Add(productList);

                return productdashboard;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }
    }
}
