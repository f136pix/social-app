// PostLike.ts
import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity('post_likes')
export class PostLike {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.postsLiked, { onDelete: 'CASCADE' }) // many users podem gostar de um post
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Post, post => post.postLikes, { onDelete: 'CASCADE' }) // um post pode ser liked by many users
    @JoinColumn({ name: "post_id" })
    post!: Post;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    likedAt!: Date;
}
