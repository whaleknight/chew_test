using System.ComponentModel.DataAnnotations;

namespace Commander.Dtos
{
    public class AccountCreateDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public decimal InitialBalance { get; set; }
    }
}