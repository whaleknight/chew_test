using System;
using System.Collections.Generic;
using Commander.Dtos;
using Commander.Models;

namespace Commander.Data
{
    public interface IAccountRepo
    {
        bool SaveChanges();

        IEnumerable<Account> GetAllAccounts();
        Account GetAccountById(int id);
        void CreateAccount(Account cmd);
        void UpdateAccount(Account cmd);
        void DeleteAccount(Account cmd);
        int TransferAmount(MoneyTransferDto cmd);
        IEnumerable<Transaction> GetAllTransfers();
    }
}