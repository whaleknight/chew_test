using System;
using System.Collections.Generic;
using Commander.Dtos;
using Commander.Models;

namespace Commander.Data
{
    public class MockAccountRepo : IAccountRepo
    {
        public void CreateAccount(Account cmd)
        {
            throw new System.NotImplementedException();
        }

        public void DeleteAccount(Account cmd)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Account> GetAllAccounts()
        {
            var Accounts = new List<Account>
            {
                new Account{Id=0, UserName="Boil an egg", InitialBalance=1.02m},
                new Account{Id=1, UserName="Cut bread", InitialBalance=2.04m},
                new Account{Id=2, UserName="Make cup of tea",InitialBalance=11.02m}
            };

            return Accounts;
        }

        public Account GetAccountById(int id)
        {
            return new Account{Id=0, UserName = "Boil an egg", InitialBalance = 41.02m };
        }

        public bool SaveChanges()
        {
            throw new System.NotImplementedException();
        }

        public void UpdateAccount(Account cmd)
        {
            throw new System.NotImplementedException();
        }

        public int TransferAmount(MoneyTransferDto cmd)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Transaction> GetAllTransfers()
        {
            throw new NotImplementedException();
        }
    }
}