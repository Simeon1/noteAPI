import {EntityRepository, Repository } from "typeorm";
import { NoteEntity } from "../database/entities/note.entity";

@EntityRepository(NoteEntity)
export class NoteRepository extends Repository<NoteEntity>{

}