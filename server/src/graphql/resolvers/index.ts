import {User} from "../../entity/User";
import {Response} from "express";
import {BadRequest, InternalServerError, NotFound} from "http-errors";
import {compare, hash} from "bcrypt";
import {ILoginResponse} from "../../types";
import {sign} from "jsonwebtoken";
import {ok} from "node:assert";
import {Post} from "../../entity/Post";

export const resolvers = {
    // retrieve all users
    users: async () => {
        return User.find();
    },
    // create user
    createUser: async (args: any, res: Response): Promise<User> => {
        try {

            // check se email ja foi cadastrado
            const alreadyExists: User | null = await User.findOneBy({
                email: args.userInput.email
            })
            if (alreadyExists) {
                throw new BadRequest("already-exists")
            }

            const user: User = new User();
            user.username = args.userInput.username
            user.name = args.userInput.name
            user.email = args.userInput.email
            user.password = await hash(args.userInput.password, 14) // hashing password

            return await User.save(user)
                .then(result => {
                    return result
                })
                .catch(err => {
                    throw new InternalServerError("Erro interno")
                })

        } catch (err: any) {
            if (err.message.includes("already-exists")) {
                throw new BadRequest('Email já cadastrado')
            }
            throw new InternalServerError("Houve um erro ao cadastrar o user")
        }
    },
    // auth login
    loginUser: async (args: any): Promise<ILoginResponse> => {
        const user: User | null = await User.findOneBy({
            email: args.userLogin.email
        })
        if (!user) {
            throw new NotFound('Email não cadastrado')
        }

        const inputedPassword = args.userLogin.password
        const validPassword: boolean = await compare(inputedPassword, user.password);
        if (!validPassword) {
            throw new BadRequest('Senha incorreta')
        }

        return {
            jwtToken: sign({id: user.id}, `${process.env.HASH_KEY}`, {expiresIn: "15m"})
        };
    },

    createPost: async (args: any, res: Response): Promise<Boolean> => {
        const post: Post = new Post();
        post.caption = args.postInput.caption
        post.tags = args.postInput.tags
        post.imageUrl = args.postInput.imageUrl
        post.location = args.postInput.location
        post.user = args.postInput.user


        const savedPost: Post = await post.save()
        if (!savedPost) {
            return false
        }
        return true
    }
}