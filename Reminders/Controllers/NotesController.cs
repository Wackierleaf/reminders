using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System.Collections.Generic;
using Reminders.Models;
using System;

namespace MvcMovie.Controllers
{
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        INoteRepository NoteRepository;

        public NotesController(INoteRepository noteRepository)
        {
            NoteRepository = noteRepository;
        }
        
        [HttpGet(Name ="GetAllNotes")]
        public IEnumerable<Note> Get()
        {
            return NoteRepository.Get();
        }

        [HttpGet("{id}", Name ="GetNote")]
        public IActionResult Get(int Id)
        {
            Note note = NoteRepository.Get(Id);
            if( note == null)
            {
                return NotFound();
            }

            return new ObjectResult(note);
        }

        [HttpPost("{needParse}")]
        public IActionResult Create (bool needParse, [FromBody] Note note)
        {
            if ( note == null)
            {
                return BadRequest();
            }

            if(needParse)
            {
                note.doParse();
            }
            NoteRepository.Create(note);
            return CreatedAtRoute("GetNote", new { id = note.id }, note);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int Id)
        {
            var deletedNote = NoteRepository.Delete(Id);
            if(deletedNote==null)
            {
                return BadRequest();
            }

            return new ObjectResult(deletedNote);
        }
    }
}