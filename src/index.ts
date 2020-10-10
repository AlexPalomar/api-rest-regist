import express,{Application} from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan'
import cors from 'cors';
import indexRoute from './routes/indexRoute';
import rtRoute from './routes/rtRoute';
import connect from './database';
import path from 'path';

class Server{

  private app: Application;

  constructor(){
    this.app = express();
    this.config();
    this.routes();
    connect;
  }

  config(): void{
    // setting
    this.app.set(('port'), process.env.PORT || 4000);
    this.app.set('views', path.join(__dirname, '/views'));
    this.app.engine('.hbs', exphbs({
      defaultLayout: 'main',
      layoutsDir: path.join(this.app.get('views'), 'layouts'),
      partialsDir: path.join(this.app.get('views'), 'partials'),
      extname: '.hbs'
    }));
    this.app.set('view engine', '.hbs')

    // Middlewares
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    // config path files static
    this.app.use(express.static(path.resolve(__dirname, 'public')));
    console.log(path.resolve(__dirname, 'public'));
  }

  routes(): void{
    this.app.use(indexRoute);
    this.app.use('/api',rtRoute);
  }

  start(): void{
    this.app.listen(this.app.get('port'), () =>{
      console.log('Server on port ', this.app.get('port'));
    });
  }
  
}

const server = new Server();
server.start();
