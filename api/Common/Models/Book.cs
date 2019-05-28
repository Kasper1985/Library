using System;

namespace Common.Models
{
    public class Book
    {
        public int ID { get; set; }
        public string InvertoryNumber { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int Year { get; set; }
        public bool Available { get; set; }
        public string ISBN { get; set; }
        public string Cover { get; set; }
    }
}
