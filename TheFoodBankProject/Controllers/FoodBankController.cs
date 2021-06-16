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

        [HttpGet("CheckIngredient")]
        public bool CheckIngredient(string foodName)
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                Ingredient result = context.Ingredients.ToList().Find(item => item.FoodName.ToLower().Trim() == foodName.ToLower().Trim());
                if (result == null)
                {
                    return false;
                } 
                else
                {
                    return true;
                }
            }

            
        }


        //gets ingredients using the bank id
        [HttpGet("GetIngredientsByBankId")]
        public List<Ingredient> GetIngredientsByBankId(int bankId)
        {
            List<Ingredient> result = new List<Ingredient>();
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                foreach (Inventory i in context.Inventories.ToList())
                {
                    if (i.BankId == bankId)
                    {
                        Ingredient ing = context.Ingredients.ToList().Find(ingred => ingred.Id == i.IngredientsId);
                        result.Add(ing);
                    }
                }
            }
            return result;
        }

        [HttpPost("AddUser")]

        public User AddUser(string loginId)
        {
            using(FoodBankDBContext context = new FoodBankDBContext())
            {
                User newUser = new User()
                {
                    LoginId = loginId
                };
                context.Users.Add(newUser);
                context.SaveChanges();
                return newUser;
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
                //Ingredient ingredientName = new Ingredient()
                //{
                //    FoodName = foodName
                //};
                //context.Ingredients.Add(ingredientName);
                //context.SaveChanges();
                //return ingredientName;

                return context.Ingredients.ToList().Find(b => b.FoodName.ToLower().Trim() == foodName.ToLower().Trim());
            }
        }

        // api/FoodBank/bankName
        [HttpGet("bankName")]
        public Bank SearchByBankName(string bankName)
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                //Bank bank = new Bank()
                //{
                //    BankName = bankName
                //};
                //context.Banks.Add(bank);
                //context.SaveChanges();
                //return bank;

                return context.Banks.ToList().Find(b => b.BankName == bankName);
            }
        }

        // api/FoodBank/DeleteFromCart
        [HttpDelete("DeleteFromInventory")]
        public Inventory DeleteIngredientFromInventory(int ingredientId, int quantity)
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

        // api/FoodBank/DeleteQuantity
        [HttpDelete("DeleteQuantity")] 

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
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
               Inventory existingInventory = context.Inventories.ToList().Find(q => q.BankId == bankId && q.IngredientsId == ingredientsId);
               if(existingInventory == null)
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
                else
                {
                    existingInventory.Quantity += quantity;
                    context.SaveChanges();
                }
                return existingInventory;
            }
        }


        [HttpPut("SubtractQuantity")]

        public Inventory SubtractQuantity(int ingredientId, int quantity,int bankId)
        {
            using (FoodBankDBContext context = new FoodBankDBContext())
            {
                var existingInventory = context.Inventories.Where(i => i.BankId == bankId && i.IngredientsId == ingredientId).FirstOrDefault<Inventory>();
                if(existingInventory != null)
                {
                    existingInventory.Quantity = existingInventory.Quantity - quantity;
                    context.SaveChanges();
                    if(existingInventory.Quantity <= 0)
                    {
                        context.Inventories.Remove(existingInventory);
                        context.SaveChanges();
                    }
                    //if quantity <= 0
                    //remove existing from db
                    //context.inventories.remove(existing)
                    //save
                }
                return existingInventory;
            }

            
        }
    }
}
