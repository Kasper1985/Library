using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Models
{
    public class User
    {
        public int ID { get; set; }
        public string Salutation { get; set; }
        public string NameFirst { get; set; }
        public string NameLast { get; set; }
        public string EMail { get; set; }
    }
}
