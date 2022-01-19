using System.Text.RegularExpressions;
using System;
using RemindersLib;

/*
 * Класс для парсинга строки и создания заметки определённого типа
 */
public class StringParser
{

    enum timeMarkers
    {
        NONE = -1,
        ONSUNDAY,
        ONMONDAY,
        ONTUESDAY,
        ONWEDNESDAY,
        ONTHURSDAY,
        ONFRIDAY,
        ONSATURDAY,
        DAY,
        WEEK,
        MONTH,
        YEAR
    }

    enum NoteTypes
    {
        BASE,
        ONCE,
        PERIOD,
        NONE
    }

    /*
    * Структура для хранения и использования регулярных выражений 
    */
    struct regexps
    {
        public string by;
        public string each;
        public string on;
        public string WeekDays;
        public string DaysWeeksAndEtc;
        public string definePeriodicity;
        public string findTime;

        public void init()
        {
            by = @"((^по\s)|(\sпо\s))+";
            each = @"((^кажд(ый|ую)\s)|(\sкажд(ый|ую)\s))+";
            on = @"((^в(о\s|\s))|(\sв(о\s|\s)))+";
            WeekDays = @"(понедельник(ам|\W|$)|вторник(ам|\W|$)|сред(ам|у|$)|четверг(ам|\W|$)|пятниц(ам|у|$)|суббот(ам|у|$)|воскресень(ям|е|$))";
            DaysWeeksAndEtc = @"(день|неделю|месяц|год)";
            definePeriodicity = @"(понедельник|вторник|сред|четверг|пятниц|суббот|воскресень)";
            findTime = @"\b[0-2]?\d:[0-5]\d\b";
        }
    }

    /*
     * Структура для основы по которой создадим заметку нужного типа
     */
    struct noteProto
    {
        public NoteTypes noteType;
        public string noteContent;
        public string period;
        public timeMarkers periodForCalc;
        public DateTime time;
        public DateTime timeToremind;
        public timeMarkers dayOfnote;
        public noteProto(string rawString)
        {
            noteType = NoteTypes.NONE;
            noteContent = rawString;
            period = "0";
            timeToremind = new DateTime();
            time = new DateTime();
            periodForCalc = timeMarkers.NONE;
            dayOfnote = timeMarkers.NONE;
        }
    }

    private string[] rawStrings;
    private regexps exp;

    public StringParser(string[] rawStrings)
    {
        this.rawStrings = rawStrings;
        exp.init();
    }

    public string[] getStrings()
    {
        return rawStrings;
    }

    /*
     * Вспомогательный метод для определения времени чтобы потом на основе данных из этого метода считать время для DateTime
     */
    private timeMarkers defineTimeMark(string period)
    {
        switch (Regex.Match(period, exp.definePeriodicity + "|" + exp.DaysWeeksAndEtc, RegexOptions.IgnoreCase | RegexOptions.Compiled).Value.ToLower())
        {
            case "понедельник": return timeMarkers.ONMONDAY;
            case "вторник": return timeMarkers.ONTUESDAY;
            case "сред": return timeMarkers.ONWEDNESDAY;
            case "четверг": return timeMarkers.ONTHURSDAY;
            case "пятниц": return timeMarkers.ONFRIDAY;
            case "суббот": return timeMarkers.ONSATURDAY;
            case "воскресень": return timeMarkers.ONSUNDAY;
            case "день": return timeMarkers.DAY;
            case "неделю": return timeMarkers.WEEK;
            case "месяц": return timeMarkers.MONTH;
            case "год": return timeMarkers.YEAR;
            default: return timeMarkers.NONE;
        }
    }

    /*
     * Метод для определения типы заметки
     */
    private noteProto defineNoteType(noteProto note)
    {
        if (Regex.Match(rawStrings[0], exp.by + exp.WeekDays, RegexOptions.IgnoreCase | RegexOptions.Compiled).Success)
        {
            note.noteType = NoteTypes.PERIOD;
            note.period = Regex.Match(rawStrings[0], exp.by + exp.WeekDays, RegexOptions.IgnoreCase | RegexOptions.Compiled).Value;
            note.periodForCalc = defineTimeMark(note.period);
            note.dayOfnote = note.periodForCalc;
        }
        if (Regex.Match(rawStrings[0], exp.each + "(" + exp.DaysWeeksAndEtc + "|" + exp.WeekDays + ")" + "+", RegexOptions.IgnoreCase | RegexOptions.Compiled).Success)
        {
            note.noteType = NoteTypes.PERIOD;
            note.period = Regex.Match(rawStrings[0], exp.each + exp.DaysWeeksAndEtc + "?" + exp.WeekDays + "?", RegexOptions.IgnoreCase | RegexOptions.Compiled).Value;
            note.periodForCalc = defineTimeMark(note.period);
            if (Regex.Match(rawStrings[0], exp.on + exp.WeekDays, RegexOptions.IgnoreCase | RegexOptions.Compiled).Success)
            {
                note.dayOfnote = defineTimeMark(Regex.Match(rawStrings[0], exp.on + exp.WeekDays, RegexOptions.IgnoreCase | RegexOptions.Compiled).Value);
            }
        }
        if (Regex.Match(rawStrings[0], exp.on + exp.WeekDays, RegexOptions.IgnoreCase | RegexOptions.Compiled).Success && note.noteType != NoteTypes.PERIOD)
        {
            note.noteType = NoteTypes.ONCE;
            note.dayOfnote = defineTimeMark(Regex.Match(rawStrings[0], exp.on + exp.WeekDays, RegexOptions.IgnoreCase | RegexOptions.Compiled).Value);
        }
        if (note.noteType == NoteTypes.NONE)
        {
            note.noteType = NoteTypes.BASE;
        }
        return note;
    }

    private noteProto addDays(noteProto note)
    {
        while (Convert.ToInt32(note.time.DayOfWeek) != Convert.ToInt32(note.dayOfnote))
        {
            note.time = note.time.AddDays(1);
        }
        return note;
    }

    /*
     * Метод для определения ближайшего времени заметки
     */
    private noteProto defineNoteTime(noteProto note)
    {
        if (Regex.Match(rawStrings[0], exp.findTime, RegexOptions.Compiled).Success)
        {
            note.time = DateTime.Parse(Regex.Match(rawStrings[0], exp.findTime, RegexOptions.Compiled).Value);
            note.timeToremind = note.time;
            note = addDays(note);
        }
        else
        {
            note.time = DateTime.Now;
            note = addDays(note);
        }
        if (Regex.Match(rawStrings[1], exp.findTime, RegexOptions.Compiled).Success)
        {
            DateTime time = DateTime.Parse(Regex.Match(rawStrings[1], exp.findTime, RegexOptions.Compiled).Value);
            if (note.timeToremind > time)
            {
                note.timeToremind = note.time.Add(-(note.timeToremind - time));
            }
        }
        else
        {
            note.timeToremind = note.time.AddMinutes(-30);
        }
        return note;
    }

    /*
     * Метод для получения уже готовой заметки
     */
    public dynamic getNote()
    {
        noteProto noteProt = new noteProto(rawStrings[0]);
        noteProt = defineNoteType(noteProt);
        if (noteProt.noteType != NoteTypes.BASE)
        {
            noteProt = defineNoteTime(noteProt);
        }
        switch (noteProt.noteType)
        {
            case NoteTypes.ONCE: return new SimpleNote(noteProt.noteContent, noteProt.time, noteProt.timeToremind);
            case NoteTypes.PERIOD: return new PeriodicNote(noteProt.noteContent, noteProt.time, noteProt.timeToremind, noteProt.period);
            default: return new BaseNote(noteProt.noteContent);
        }
    }
}
