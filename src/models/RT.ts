import {Schema, model} from 'mongoose';

const rtSchema = new Schema({
  id: String,
  ot: String,
  description: String,
  date: String,
  state: String
},{
  timestamps: true
});

export default model('rt', rtSchema);
