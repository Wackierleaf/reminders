using System;
using RemindersLib;


namespace Reminders.Models
{
    public class Note
    {
        public int id { get; set; }
        public string content { get; set; }
        public DateTime? time {get;  set; }
        public DateTime? timeToRemind { get; set; }
        public string color { get; set; }
        public string period { get; set; }

        public void doParse()
        {
            StringParser parser = new StringParser(new string[]{content, ""});
            var note = parser.getNote();
            switch (note.type)
            {
                case "simple":
                    time = note.getNoteTime();
                    timeToRemind = note.getTimeToRemind();
                    break;
                case "period":
                    time = note.getNoteTime();
                    timeToRemind = note.getTimeToRemind();
                    period = note.getPeriod();
                    break;
            }
        }
    }
}
