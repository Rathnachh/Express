import { movieModel } from "../models/movieModel";

export class MovieRepository {
  async getById(movieId: string) {
    return await movieModel.findById(movieId);
  }

  // static async getAll() {
  //   return await movieModel.find({});
  // }
  async getAll() {
    return await movieModel.find({})
  }

  async updateById(movieId: string, movieData: any) {
    return await movieModel.findByIdAndUpdate(movieId, movieData);
  }

   async deleteById(movieId :string) {
    return await movieModel.findByIdAndDelete(movieId);
  }

  async create(movieData: any) {
    return await movieModel.create(movieData);
  }

  
}
