using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Commander.Models
{
    public class Transaction
    {
        [Key]
        [Required]
        public int TransactionId { get; set; }

        [Required]
        public int SourceAccountId { get; set; }
        
        [Required]
        public int DestinationAccountId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TransferAmount { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
    }
}