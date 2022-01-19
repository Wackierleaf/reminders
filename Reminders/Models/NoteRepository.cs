using System;
using System.Collections.Generic;
using Reminders.Models;

public interface INoteRepository
{
    IEnumerable<Note> Get();
    Note Get(int id);
    void Create(Note note);
    Note Delete(int id);
}

public class NoteRepository : INoteRepository
{
    private NoteContext Context;
    public IEnumerable<Note> Get ()
    {
        return Context.Notes;
    }

    public Note Get(int Id)
    {
        return Context.Notes.Find(Id);
    }
    public NoteRepository(NoteContext context)
    {
       Context = context;
    }

    public void Create(Note note)
    {
        Context.Notes.Add(note);
        Context.SaveChanges();
    }

    public Note Delete (int Id)
    {
        Note note = Get(Id);
        if (note != null)
        {
            Context.Notes.Remove(note);
            Context.SaveChanges();
        }
        return note;
    }
}