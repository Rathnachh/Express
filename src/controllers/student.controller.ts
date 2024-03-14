import { Request, Response } from "express"

export const index = async(req: Request, res:Response) => {
    res.send('Hello from student')
}
export const ejs = async(req:Request, res:Response)=>{
    res.render('student/index');
}