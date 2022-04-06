import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string
}

export function isAuthenticated(req: Request, res:Response, next: NextFunction){
    //Rercebendo o Token
    const authToken = req.headers.authorization

    if(!authToken){
        return res.status(401).end()
    }

    const [, token] = authToken.split(" ")

    try{
    //validar o token

        const {sub} = verify(token, process.env.JWT_SECRET) as PayLoad

        //Recuperando o id do token colocando dentro de uma variavel user_id dentro do req.
        req.user_id = sub

        return next()

    }catch(err){
        return res.status(401).end()
    }

    console.log(token)
}