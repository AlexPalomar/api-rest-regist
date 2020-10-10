import {Router, Request, Response} from 'express';
import RT from '../models/RT'

class IndexRoute{
  public router: Router = Router();

  constructor(){
    this.config();
  }

  config(){
    this.router.get('/', (req: Request, res: Response) => {
      res.render('index');
    });
  }
}

const indexRoute  = new IndexRoute();
export default indexRoute.router;