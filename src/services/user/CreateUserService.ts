import  prismaCliente from '../../prisma'
import { hash } from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password}: UserRequest){
        
        //Verificação do email
        if(!email){
            throw new Error("Email incorreto")
        }
        
        //Verificação se o email está cadastrado
        const userAlreadyExists = await prismaCliente.user.findFirst({
            where:{
                email: email
            }
        })
        if(userAlreadyExists){
            throw new  Error("O email de usuário já existe!!")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaCliente.user.create({
            data:{
                name:name,
                email:email,
                password: passwordHash,
            },
            select:{
                id: true,
                name:true,
                email: true
            }
        })

        return user
    }
}

export {CreateUserService}