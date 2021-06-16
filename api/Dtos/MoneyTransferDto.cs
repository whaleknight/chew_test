using System.ComponentModel.DataAnnotations;
using System;

namespace Commander.Dtos
{
    public class MoneyTransferDto
    {
        public int TransactionId { get; set; }
        public int SourceAccountId { get; set; }
        public int DestinationAccountId { get; set; }
        public decimal TransferAmount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}