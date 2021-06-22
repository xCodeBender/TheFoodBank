using System;
using System.Collections.Generic;

#nullable disable

namespace TheFoodBankProject
{
    public partial class Order
    {
        public int Id { get; set; }
        public int? OrderId { get; set; }
        public int? UserId { get; set; }
        public int? IngredientId { get; set; }
        public int? Quantity { get; set; }
    }
}
