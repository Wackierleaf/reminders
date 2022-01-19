using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Reminders.Models
{
     public class NoteContext: DbContext
    {
        public NoteContext(DbContextOptions<NoteContext> options)
            : base(options)
        {
            
        }
        public DbSet<Note> Notes { get; set; }
    }
}