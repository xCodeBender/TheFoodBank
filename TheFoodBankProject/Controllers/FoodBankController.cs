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
        // api/FoodBank/AddFood
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


        // api/FoodBank/GetInventory
        [HttpGet("GetInventory")]
        public List<Inventory> GetInventory()
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                return context.Inventories.ToList();
            }
                
        }



        // api/FoodBank/AllIngredients
        [HttpGet("AllIngredients")]
        public List<Ingredient> GetAllIngredients()
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                return context.Ingredients.ToList();
            }
        }

        // api/FoodBank/IngredientId
        [HttpGet("IngredientId")]  // check for correct parameters
        public Ingredient SearchByIngredient(int apiId)
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                Ingredient ingredientId = new Ingredient();

                ingredientId = context.Ingredients.ToList().Find(i => i.ApiId == apiId);


                return ingredientId;
            }
        }

        // api/FoodBank/keyword
        [HttpGet("keyword")]
        public Ingredient SearchByKeyWord(string foodName)
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                Ingredient keyIngredient = new Ingredient()
                {
                    FoodName = foodName
                };
                context.Ingredients.Add(keyIngredient);
                context.SaveChanges();
                return keyIngredient;
            }
        }

        // api/FoodBank/ingredientName
        [HttpGet("ingredientName")]
        public Ingredient SearchByFoodName(string foodName)
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                Ingredient ingredientName = new Ingredient()
                {
                    FoodName = foodName
                };
                context.Ingredients.Add(ingredientName);
                context.SaveChanges();
                return ingredientName;
            }
        }

        // api/FoodBank/bankName
        [HttpGet("bankName")]
        public Bank SearchByBankName(string bankName)
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                Bank bank = new Bank()
                {
                    BankName = bankName
                };
                context.Banks.Add(bank);
                context.SaveChanges();
                return bank;
            }
        }

        // api/FoodBank/DeleteFromCart
        [HttpDelete("DeleteFromCart")]
        public Inventory DeleteIngredientFromCart(int ingredientId, int quantity) // add correct parameters
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                Inventory remove = new Inventory();
               remove =  context.Inventories.ToList().Find(f => f.IngredientsId == ingredientId && f.Quantity == quantity);
                context.Remove(remove);
                context.SaveChanges();
                return remove;

            }
        }

        // api/FoodBank/DeleteQuantity
        [HttpDelete("DeleteQuantity")] // do we use HTTP DELETE or POST?

        public Inventory DeleteFromQuantity(int ingredientId, int quantity)
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                Inventory remove = new Inventory();
                remove = context.Inventories.ToList().Find(f => f.IngredientsId == ingredientId && f.Quantity == quantity);
                context.Remove(remove);
                context.SaveChanges();
                return remove;

            }
        }

        // api/FoodBank/DisplayCart
        [HttpGet("DisplayCart")]
        public List<Ingredient> DisplayCart() 
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {

                return context.Ingredients.ToList();
            }
        }

        // api/FoodBank/AddToInventory
        [HttpPost("AddToInventory")]

        public Inventory AddToInventory(int bankId, int ingredientsId, int quantity)
        {
            using(FoodBankDBContext context = new FoodBankDBContext())
            {
                Inventory adder = new Inventory()
                {
                    BankId = bankId,
                    IngredientsId = ingredientsId,
                    Quantity = quantity
                };

                context.Inventories.Add(adder);
                context.SaveChanges();
                return adder;
            }
        }
    }
}
