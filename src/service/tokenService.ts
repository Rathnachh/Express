import Token from "../database/models/tokenModel";

export async function saveToken(userId:number, token:string) {
  await Token.create({ userId, token });
}