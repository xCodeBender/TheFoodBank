using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TheFoodBankProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodBankController : ControllerBase
    {
        [HttpPost("AddFood")]
        public Ingredient AddIngredient(int apiId, string foodName, string foodImages)
        {
           using (FoodBankDBContext context = new FoodBankDBContext())
            {
                Ingredient newIngredient = new Ingredient()
                {
                    FoodName = foodName,
                    ApiId = apiId,
                    FoodImages = foodImages
                    
                };
                context.Ingredients.Add(newIngredient);
                context.SaveChanges();
                return newIngredient;
            }
        }
    }
}
