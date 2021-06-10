using System;
using System.Collections.Generic;

#nullable disable

namespace TheFoodBankProject
{
    public partial class Ingredient
    {
        public int Id { get; set; }
        public int? ApiId { get; set; }
        public string FoodName { get; set; }
        public string FoodImages { get; set; }
    }
}
