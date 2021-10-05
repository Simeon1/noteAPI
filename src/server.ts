import express, {Request, Response} from 'express';
import { NoteController } from './controller/note.controller';
import { createConnection } from "typeorm";

class Server {
    private noteController: NoteController;
    private app: express.Application;

    constructor(){
        this.app = express();
        this.configuration();
        this.noteController = new NoteController();
        this.routes();
    }

    public configuration(){
        this.app.set('port', process.env.PORT || 3001);
    }

    public async routes(){
        await createConnection({
          type: "postgres",
          host: "localhost",
          port: 5434,
          username: "note",
          password: "note",
          database: "note",
          entities: ["build/database/entities/**/*.js"],
          synchronize: true,
          name: "note"
        });
        
        this.noteController = new NoteController();

        this.app.get( "/", (req: Request, res: Response ) => {
            res.send("Hello world!" );
        })

        this.app.use(`/api/notes/`, this.noteController.router);
    }

    public start(){
        this.app.listen(this.app.get(`port`), () => {
            console.log(`server is listening ${this.app.get('port')} port.`)
        });
    }
}
const server = new Server();
server.start();
