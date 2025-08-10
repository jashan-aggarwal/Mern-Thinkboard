import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch(error) {
        console.log(`Error in getAllNotes: ${error}`);
        res.status(500).json({message: "Server Error"});
    }
}

export async function getNoteById(req, res) {
    try {
        const note = await Note.getNoteById(req.params.id);
        if(!note) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(note);
    } catch(error) {
        console.log(`Error in getNoteById: ${error}`);
        res.status(500).json({message: "Server Error"});
    }
    

}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body;
        if(!title) {
            return res.status(300).json({message: "Missing title"});
        }
        const newNote = new Note({title, content});
        const savedNote = await newNote.save();
        res.status(201).json(newNote);
    } catch(error) {
        console.log(`Error in createNote: ${error}`);
        res.status(500).json({message: "Server Error"});
    }
};

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, 
            {title, content}, 
            {new: true}
        );
        if(!updatedNote) {
            return res.status(404).json({message: "Note not found"});
        }
        await updateNote.save();
        res.status(200).json(updatedNote);
    } catch(error) {
        console.log(`Error in updateNote: ${error}`);
        res.status(500).json({message: "Server Error"});
    }
};

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) {
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(deletedNote);
    } catch(error) {
        console.log(`Error in deleteNote: ${error}`);
        res.status(500).json({message: "Server Error"});
    }
}