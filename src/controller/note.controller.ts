import { Router, Response, Request } from "express";
import { NoteService } from "../services/note.service";
import { NoteEntity } from "../database/entities/note.entity";

export class NoteController {
    public router:   Router;
    private noteService: NoteService;

    constructor(){
        this.noteService = new NoteService();
        this.router = Router();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        const notes = await this.noteService.index();
        res.send(notes).json();
    }

    
    public create = async (req: Request, res: Response) => {
        const note = req['body'] as NoteEntity;
        const newNote = await this.noteService.create(note);
        res.send(newNote);
      }
    
      public update = async (req: Request, res: Response) => {
        const post = req['body'] as NoteEntity;
        const id =  req['params']['id'];
        
        res.send(this.noteService.update(post, Number(id)));
      }
    
      public delete = async (req: Request, res: Response) => {
        const id =  req['params']['id'];
        res.send(this.noteService.delete(Number(id)));
      } 
    
      /**
       * Configure the routes of controller
       */
      public routes(){
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
      }
}