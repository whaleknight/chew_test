using System;
using System.Collections.Generic;
using System.Linq;
using Commander.Models;
using Commander.Dtos;

namespace Commander.Data
{
    public class SqlAccountRepo : IAccountRepo
    {
        private readonly CommanderContext _context;

        public SqlAccountRepo(CommanderContext context)
        {
            _context = context;
        }

        public void CreateAccount(Account cmd)
        {
            if (cmd == null)
            {
                throw new ArgumentNullException(nameof(cmd));
            }

            _context.Accounts.Add(cmd);
        }

        public void DeleteAccount(Account cmd)
        {
            if (cmd == null)
            {
                throw new ArgumentNullException(nameof(cmd));
            }
            _context.Accounts.Remove(cmd);
        }

        public IEnumerable<Account> GetAllAccounts()
        {
            return _context.Accounts.ToList();
        }

        public Account GetAccountById(int id)
        {
            return _context.Accounts.FirstOrDefault(p => p.Id == id);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

        public void UpdateAccount(Account cmd)
        {
            //Nothing
        }

        public int TransferAmount(MoneyTransferDto cmd)
        {
            if (cmd == null)
            {
                throw new ArgumentNullException(nameof(cmd));
            }

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var sourceAccount = _context.Accounts
                        .Where(c => c.Id == cmd.SourceAccountId)
                        .FirstOrDefault();

                    if (sourceAccount.InitialBalance < cmd.TransferAmount)
                        throw new Exception("Not enough balance");

                    sourceAccount.InitialBalance -= cmd.TransferAmount;

                    var destAccount = _context.Accounts
                        .Where(c => c.Id == cmd.DestinationAccountId)
                        .FirstOrDefault();

                    destAccount.InitialBalance += cmd.TransferAmount;

                    _context.SaveChanges();

                    var transferRecord = new Transaction
                    {
                        TransferAmount = cmd.TransferAmount,
                        SourceAccountId = cmd.SourceAccountId,
                        DestinationAccountId = cmd.DestinationAccountId,
                        CreatedAt = DateTime.Now
                    };

                    _context.Transactions.Add(transferRecord);
                    _context.SaveChanges();

                    transaction.Commit();

                    return transferRecord.TransactionId;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
        }
        public IEnumerable<Transaction> GetAllTransfers()
        {
            return _context.Transactions.ToList();
        }

    }
}