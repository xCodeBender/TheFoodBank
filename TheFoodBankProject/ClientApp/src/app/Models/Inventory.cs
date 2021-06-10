using System;
using System.Collections.Generic;

#nullable disable

namespace TheFoodBankProject
{
    public partial class Inventory
    {
        public int Id { get; set; }
        public int? BankId { get; set; }
        public int? IngredientsId { get; set; }
        public int? Quantity { get; set; }
    }
}
