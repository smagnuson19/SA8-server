import Note from '../models/note_model';


export const getNotes = () => {
  return Note.find({}).then((notes) => {
    return notes.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});
  });
};

export const deleteNote = (theId) => {
  return Note.remove({ _id: theId });
};

export const createNote = (fields) => {
  const note = new Note();
  note.title = fields.title;
  note.y = fields.y;
  note.x = fields.x;
  note.zIndex = fields.zIndex;
  note.text = fields.text;
  return note.save();
};

export const updateNote = (id, fields) => {
  return Note.findById(id)
    .then((note) => {
    // check out this classy way of updating only the fields necessary
      Object.keys(fields).forEach((k) => {
        note[k] = fields[k];
      });
      return note.save();
    });
};
