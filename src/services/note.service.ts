import { getConnection } from 'typeorm';
import { NoteEntity } from '../database/entities/note.entity'
import { NoteRepository } from './../repository/note.repository';
 
export class NoteService {
    private noteRepository: NoteRepository;

    constructor(){
        this.noteRepository = getConnection("note").getCustomRepository(NoteRepository)
    }

    public index = async () => {
        const notes = await this.noteRepository.find()
        return notes;
    }

    public create = async(note: NoteEntity) => {
        const newNote = await this.noteRepository.save(note);
        return newNote;
    }

    public update = async(note: NoteEntity, id: number) => {
        const updatedNote = await this.noteRepository.update(id, note);
        return updatedNote;
    }

    public delete = async(id: number) => {
        const deletedNote = await this.noteRepository.delete(id);
        return deletedNote;
    }
}