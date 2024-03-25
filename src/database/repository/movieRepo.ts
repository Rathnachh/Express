import { movieModel } from "../models/movieModel";

export class MovieRepository {
  static async findById(movieId: string) {
    return await movieModel.findById(movieId);
  }

  static async findAll() {
    return await movieModel.find({});
  }

  static async updateById(movieId: string, movieData: any) {
    return await movieModel.findByIdAndUpdate(movieId, movieData);
  }

  static async deleteById(movieId :string) {
    return await movieModel.findByIdAndDelete(movieId);
  }

  static async create(movieData: any) {
    return await new movieModel(movieData).save();
  }
}
