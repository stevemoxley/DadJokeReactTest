using DadJokeReactTest.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace DadJokeReactTest.Services
{
    public class DadJokeApi
    {
        public DadJokeSearch Search(string searchTerm)
        {
            var webClient = new WebClient();
            webClient.Headers.Add(HttpRequestHeader.Accept, "application/json");
            var json = webClient.DownloadString($"https://icanhazdadjoke.com/search?term={searchTerm}");

            return JsonConvert.DeserializeObject<DadJokeSearch>(json);
        }
    }
}
