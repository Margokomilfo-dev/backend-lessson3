import {db} from "../../db/db";
import {blogsRepository} from "../blogs/blogs-repository";
import {PostType} from "../../types/post.type";
import {ObjectId} from "mongodb";

export const postsRepository = {
    async getPosts() {
        return db.posts
    },
    async getPostById(id: string): Promise<PostType | null> {
        const post = db.posts.find((p) => p.id === id)
        if (post) {
            return post
        } else {
            return null
        }
    },
    async createPost(
        body: {
            title: string
            content: string
            blogId: string
            shortDescription: string
        },
        blogName: string
    ): Promise<PostType | null> {
        const blog = await blogsRepository.getBlogById(body.blogId)
        const newPost: PostType = {
            id: new Date().getTime().toString(),
            title: body.title,
            content: body.content,
            blogId: new ObjectId(blog!._id),
            shortDescription: body.shortDescription,
            blogName,
            //blogName: blogsRepository.getBlogById(body.blogId)!.name
        }
        db.posts = [...db.posts, newPost]

        if (db.posts.find((p) => p.id === newPost.id)) {
            return newPost
            //  return newPost.id
        } else {
            return null
        }
    },
    async updatePost(
        id: string,
        body: {
            title: string
            content: string
            blogId: string
            shortDescription: string
        }
    ):Promise<boolean> {
        //need todo
        return true
    },

    async deletePost(id: string): Promise<boolean> {
        //need todo
        return false
    },
    async deleteAll() {
        //need todo
    },
}
