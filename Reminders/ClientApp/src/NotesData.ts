export interface NotesData {
  color: string;
  content: string;
  id: number;
  period?: string;
  time?: Date;
  timeToRemind?: Date;
}

export interface NotesBundel {
  bundleId: number;
  notes: NotesData[];
}

export function fixData(notes: any[]): NotesData[] {
  const fixedNotes: NotesData[] = [];
  notes.forEach((note) => {
    const fixedNote: NotesData = {
      color: note.color,
      content: note.content,
      id: note.id,
      period: note.period,
      time: note.time !== null ? new Date(Date.parse(note.time)) : undefined,
      timeToRemind: note.time !== null ? new Date(Date.parse(note.timeToRemind)) : undefined,
    };
    fixedNotes.push(fixedNote);
  });
  return fixedNotes;
}

export function doBundels(data: NotesData[]): NotesBundel[] {
  const bundels: NotesBundel[] = [];
  const bundelSize = 4;
  for (let i = 0; i < Math.ceil(data.length / bundelSize); i++) {
    bundels.push({
      bundleId: i,
      notes: data.slice(i * bundelSize, i * bundelSize + bundelSize),
    });
  }
  return bundels;
}

export function doFiltration(notes: NotesBundel[], filterType: string, fromDate?: Date, toDate?: Date): any {
  const filteredNotes: NotesData[] = [];
  switch (filterType) {
    case "Сегодня":
      notes.forEach((bundel) => {
        bundel.notes.forEach((note) => {
          const date = new Date();
          if (note.time && +note.time > +date && +note.time < +date.setHours(23, 59, 59, 999)) {
            filteredNotes.push(note);
          }
        });
      });
      return doBundels(filteredNotes);
    case "Завтра":
      notes.forEach((bundel) => {
        bundel.notes.forEach((note) => {
          const date = new Date();
          date.setDate(date.getDate() + 1);
          date.setHours(0, 0, 0, 0);
          console.log(date.toLocaleString());
          if (note.time && +note.time > +date && +note.time < +date.setHours(23, 59, 59, 999)) {
            filteredNotes.push(note);
          }
        });
      });
      return doBundels(filteredNotes);
    case "На неделю":
      notes.forEach((bundel) => {
        bundel.notes.forEach((note) => {
          const date = new Date();
          if (note.time && +note.time > +date && +note.time < +date.setDate(date.getDate() + 7)) {
            filteredNotes.push(note);
          }
        });
      });
      return doBundels(filteredNotes);
    case "На месяц":
      notes.forEach((bundel) => {
        bundel.notes.forEach((note) => {
          const date = new Date();
          if (note.time && +note.time > +date && +note.time < +date.setDate(date.getDate() + 30)) {
            filteredNotes.push(note);
          }
        });
      });
      return doBundels(filteredNotes);
    case "Произвольный период":
      if (fromDate && toDate) {
        notes.forEach((bundel) => {
          bundel.notes.forEach((note) => {
            if (note.time && +note.time > +fromDate && +note.time < +toDate) {
              filteredNotes.push(note);
            }
          });
        });
        return doBundels(filteredNotes);
      }
  }
}
