using System;
using RemindersLib;
/*
 * Класс обычной, не переодическими заметки
 */

public class SimpleNote : BaseNote
{
    protected DateTime noteTime;
    protected DateTime timeToRemind;

    public SimpleNote() { }
    public SimpleNote(string noteContent, DateTime noteTime, DateTime timeToRemind)
    {
        this.type = "simple";
        this.noteContent = noteContent;
        this.noteTime = noteTime;
        this.timeToRemind = timeToRemind;
    }

    public DateTime getNoteTime()
    {
        return noteTime;
    }

    public DateTime getTimeToRemind()
    {
        return timeToRemind;
    }
}
