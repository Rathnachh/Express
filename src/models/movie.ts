import mongoose from 'mongoose';
//Schema កំណត់រូបរាងទិន្នន័យក្នុង database
const MovieSchema = new mongoose.Schema({
    movieId:{
        type:String
    },
 name: {
  type: String,
  trim: true,  
  required: true,
 },
 released_on: {
  type: Date,
  trim: true,
  required: true
 }
});
export const movieModel = mongoose.model('Movie', MovieSchema)//model is use to interact with database
