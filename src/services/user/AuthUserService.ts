import prismaClient from "../../prisma";
import {compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'

interface AuthReuest{
    email: string,
    password: string
}

class AuthUserService{
    async execute({email, password}: AuthReuest){
       //Verificação do email existente
       const user = await prismaClient.user.findFirst({
           where:{
               email: email
           }
       })

       if(!user){
           throw new Error("Usuário ou senha incorreto")
       }

       //Verificação de senha 
        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("Usuário ou senha incorreto")
        }

        // Token JWT e devolver os dados do usuário: email, id e name (se deu tudo certo, gerar o token)
        const token = sign(
            {
                name: user.name,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )


        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService}