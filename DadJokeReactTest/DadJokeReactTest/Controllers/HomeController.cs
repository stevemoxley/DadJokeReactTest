using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DadJokeReactTest.Models;
using DadJokeReactTest.Services;
using Newtonsoft.Json;

namespace DadJokeReactTest.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Search(string searchTerm)
        {
            var dadJokeApi = new DadJokeApi();

            var result = dadJokeApi.Search(searchTerm);

            return Json(JsonConvert.SerializeObject(result));
        }

        [HttpPost]
        public JsonResult Save([FromBody] DadJokeSearch search)
        {
            //Save
            return Json("true");
        }

    }
}
