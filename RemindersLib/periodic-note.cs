using System;

/*
 * Класс периодической заметки
 */

public class PeriodicNote : SimpleNote
{
    protected string notePeriod;

    public PeriodicNote() { }

    public PeriodicNote(string noteContent, DateTime noteTime, DateTime timeToRemind, string period)
    {
        this.type = "period";
        this.noteContent = noteContent;
        this.noteTime = noteTime;
        this.timeToRemind = timeToRemind;
        this.notePeriod = period;
    }

    public string getPeriod()
    {
        return notePeriod;
    }
}

