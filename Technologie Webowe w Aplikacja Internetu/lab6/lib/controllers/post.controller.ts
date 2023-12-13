import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import PostModel from "../models/PostModels";
class PostController implements Controller {
    public path = '/api/posts';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get( this.path, this.getPosts);
        this.router.post(this.path, this.createPost);
    }

    private getPosts = async (request: Request, response: Response) => {
        try {
            const posts = await PostModel.find();
            response.status(201);
            response.json(posts);

        } catch (error) {
            console.error('Błąd podczas pobierania postów:', error);
            response.status(500).json({ error: 'Wystąpił błąd podczas pobierania postów' });
        }
    };

    private createPost = async (request: Request, response: Response) => {
        const { title, text, image } = request.body;

        try {
            const newPost = new PostModel({ title, text, image });
            await newPost.save();
            response.status(201).json(newPost);
        } catch (error) {
            console.error('Error:', error);
            response.status(500).json({ error: 'Error occurred' });
        }
    };
}

export default PostController;