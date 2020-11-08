import {Router, Request, Response} from 'express';
import pool from '../database';
import moment, { now } from 'moment';

class RtRoute{

  public router : Router = Router();

  constructor(){
    this.config();
  }

  config(){
    this.router.get('/rts', async (req: Request, res: Response) =>{
      
      await pool.query('SELECT * FROM rt',(err, result, fields) =>{
        if(err) throw console.log(err);

        res.json({rts: result});
      });
      
    });

    this.router.post('/rts', async (req: Request, res: Response) =>{
      
      const data ={  
        'id' : req.body.id.toString(),
        'ot' : req.body.ot.toString(),
        'description' : req.body.description.toString(),
        'date' : req.body.date.toString(),
        'state' : req.body.state.toString(),
        "date_created": `${moment(now()).format('MM/DD/YYYY h:mm a')}`,
        "date_update": `${moment(now()).format('MM/DD/YYYY h:mm a')}`
      }
      
      await pool.query('INSERT INTO rt set ?',[data]);
     
      res.status(200).json({message: 'save'});
    });

    this.router.get('/rts/id/:id', async (req: Request, res: Response) =>{
      const word = req.params.id; 
      await pool.query('SELECT * FROM rt WHERE id LIKE ?', `%${word}%`,(err, result, fields) =>{
        if(err) throw console.log(err);
        if(result.length > 0){
          res.status(200).json({rts: result});
        }else{
          res.status(200).json({rts: 'no registra'});
        }
      });
    });

    this.router.get('/rts/ot/:id', async (req: Request, res: Response) =>{
      const word = req.params.id; 
      await pool.query('SELECT * FROM rt WHERE ot LIKE ?', `%${word}%`,(err, result, fields) =>{
        if(err) throw console.log(err);
        if(result.length > 0){
          res.status(200).json({rts: result});
        }else{
          res.status(200).json({rts: 'no registra'});
        }
      });
    });

    this.router.get('/rts/description/:id', async (req: Request, res: Response) =>{
      const word = req.params.id; 
      await pool.query('SELECT * FROM rt WHERE description LIKE ?', `%${word}%`,(err, result, fields) =>{
        if(err) throw console.log(err);
        if(result.length > 0){
          res.status(200).json({rts: result});
        }else{
          res.status(200).json({rts: 'no registra'});
        }
      });
    });

    this.router.get('/rts/state/:id', async (req: Request, res: Response) =>{
      const word = req.params.id; 
      await pool.query('SELECT * FROM rt WHERE state LIKE ?', `%${word}%`,(err, result, fields) =>{
        if(err) throw console.log(err);
        if(result.length > 0){
          res.status(200).json({rts: result});
        }else{
          res.status(200).json({rts: 'no registra'});
        }
      });
    });

    this.router.get('/rts/date/:id', async (req: Request, res: Response) =>{
      const word = req.params.id; 
      await pool.query('SELECT * FROM rt WHERE date LIKE ?', `%${word}%`,(err, result, fields) =>{
        if(err) throw console.log(err);
        if(result.length > 0){
          res.status(200).json({rts: result});
        }else{
          res.status(200).json({rts: 'no registra'});
        }
      });
    });

    this.router.post('/kms', (req: Request, res: Response) => {
      const data = {
        'id': req.body.id,
        'date': req.body.day,
        'mk': req.body.km,
        'date_created': `${moment(now()).format('MM/DD/YYYY h:mm a')}`,
        'date_update': `${moment(now()).format('MM/DD/YYYY h:mm a')}`
      }
      console.log(data);
      res.status(200).json({message: 'save'});
    });
  }
}

const rtRoute = new RtRoute();
export default rtRoute.router;