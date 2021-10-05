import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notes')
export class NoteEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task: string;

    @Column()
    complete = false
}