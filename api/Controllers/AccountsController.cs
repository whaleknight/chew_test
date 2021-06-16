using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using AutoMapper;
using Commander.Data;
using Commander.Dtos;
using Commander.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;


namespace Commander.Controllers
{

    [Route("api/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountRepo _repository;
        private readonly IAccountRepo _mockrepository = new MockAccountRepo();
        private readonly IMapper _mapper;

        public AccountsController(IAccountRepo repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        // public AccountsController(IAccountRepo repository)
        // {
        //     _repository = repository;
        // }

        //GET api/accounts
        [HttpGet]
        public ActionResult<IEnumerable<AccountReadDto>> GetAllAccounts()
        {
            var accountItems = _repository.GetAllAccounts();

            // return Ok(accountItems);
            return Ok(_mapper.Map<IEnumerable<AccountReadDto>>(accountItems));
        }

        ////GET api/accounts/{id}
        [HttpGet("{id}", Name = "GetAccountById")]
        public ActionResult<AccountReadDto> GetAccountById(int id)
        {
            var accountItem = _repository.GetAccountById(id);
            if (accountItem != null)
            {
                return Ok(_mapper.Map<AccountReadDto>(accountItem));
            }
            return NotFound();
        }

        ////POST api/accounts
        [HttpPost]
        public ActionResult<AccountReadDto> CreateAccount(AccountCreateDto accountCreateDto)
        {
            var accountModel = _mapper.Map<Account>(accountCreateDto);
            _repository.CreateAccount(accountModel);
            _repository.SaveChanges();

            var accountReadDto = _mapper.Map<AccountReadDto>(accountModel);

            // return Ok(accountReadDto.Id);
            return CreatedAtRoute(nameof(GetAccountById), new { Id = accountReadDto.Id }, accountReadDto);
        }

        ////POST api/transferAmount
        [HttpPost("transfer")]
        public ActionResult<OutputTransferDto> TransferAmount(MoneyTransferDto moneyTransferDto)
        {

            try
            {
                var id = _repository.TransferAmount(moneyTransferDto);
                _repository.SaveChanges();

                // var accountReadDto = _mapper.Map<AccountReadDto>(moneyTransferDto);

                return Ok(id);
                //    return CreatedAtRoute(nameof(GetAccountById), new {Id = accountReadDto.Id}, accountReadDto);   
            }
            catch (Exception ex)
            {
                //var response = new HttpResponseMessage(HttpStatusCode.NotFound)
                //{
                //    Content = new StringContent("Employee doesn't exist", System.Text.Encoding.UTF8, "text/plain"),
                //    StatusCode = HttpStatusCode.NotFound
                //};
                //throw new HttpResponseException(response);
                var error = new Error { status = "error", message = ex.Message };
                return BadRequest(error);
            }
               
        }

        //GET api/transfers
        [HttpGet("transfers")]
        public ActionResult<IEnumerable<MoneyTransferDto>> GetAllTransfers()
        {
            try
            {
                var items = _repository.GetAllTransfers();
                return Ok(_mapper.Map<IEnumerable<MoneyTransferDto>>(items));
            }
            catch (Exception ex)
            {
                var error = new Error{ status = "error", message = ex.Message };
                return Ok(error);
            }         
        }
        class Error
        {
            public string status { get; set; }
            public string message { get; set; }
        }

        ////PUT api/accounts/{id}
        //[HttpPut("{id}")]
        //public ActionResult UpdateAccount(int id, AccountUpdateDto accountUpdateDto)
        //{
        //    var accountModelFromRepo = _repository.GetAccountById(id);
        //    if(accountModelFromRepo == null)
        //    {
        //        return NotFound();
        //    }
        //    _mapper.Map(accountUpdateDto, accountModelFromRepo);

        //    _repository.UpdateAccount(accountModelFromRepo);

        //    _repository.SaveChanges();

        //    return NoContent();
        //}

        ////PATCH api/accounts/{id}
        //[HttpPatch("{id}")]
        //public ActionResult PartialAccountUpdate(int id, JsonPatchDocument<AccountUpdateDto> patchDoc)
        //{
        //    var accountModelFromRepo = _repository.GetAccountById(id);
        //    if(accountModelFromRepo == null)
        //    {
        //        return NotFound();
        //    }

        //    var accountToPatch = _mapper.Map<AccountUpdateDto>(accountModelFromRepo);
        //    patchDoc.ApplyTo(accountToPatch, ModelState);

        //    if(!TryValidateModel(accountToPatch))
        //    {
        //        return ValidationProblem(ModelState);
        //    }

        //    _mapper.Map(accountToPatch, accountModelFromRepo);

        //    _repository.UpdateAccount(accountModelFromRepo);

        //    _repository.SaveChanges();

        //    return NoContent();
        //}

        ////DELETE api/accounts/{id}
        //[HttpDelete("{id}")]
        //public ActionResult DeleteAccount(int id)
        //{
        //    var accountModelFromRepo = _repository.GetAccountById(id);
        //    if(accountModelFromRepo == null)
        //    {
        //        return NotFound();
        //    }
        //    _repository.DeleteAccount(accountModelFromRepo);
        //    _repository.SaveChanges();

        //    return NoContent();
        //}

    }
}