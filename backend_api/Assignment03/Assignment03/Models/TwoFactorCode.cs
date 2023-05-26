using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Assignment03.Models
{
    public class TwoFactorCode
    {
        public string Code { get; set; }
        public DateTime CanBeVerifiedUntil { get; set; }
        public bool IsVerified { get; set; }

        public TwoFactorCode(string code)
        {
            Code = code;
            CanBeVerifiedUntil = DateTime.Now.AddMinutes(5);
            IsVerified = false;
        }
    }
}
