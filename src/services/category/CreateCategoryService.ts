import prismaClient from "../../prisma";

interface CategoryRequest{
    name: string
}
class CreateCategoryService{
    async execute({name}: CategoryRequest){
        if(name == ' '){
            throw new Error('Nome inválido')
        }

        const category =  await prismaClient.category.create({
            data:{
                name
            }
        })

        return category
    }
}

export {CreateCategoryService}