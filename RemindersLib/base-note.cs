using System;

/*
 * Общий класс для разных типов заметок
 */

namespace RemindersLib
{
    public class BaseNote
    {
        public string type;
        protected string noteContent;

        public BaseNote() { }
        public BaseNote(string noteContent)
        {
            this.type = "base";
            this.noteContent = noteContent;
        }

        public string getNoteContent()
        {
            return noteContent;
        }
    }
}
