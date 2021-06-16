using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Commander.Models
{
    public class Account
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(20)]
        public string UserName { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal InitialBalance { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}