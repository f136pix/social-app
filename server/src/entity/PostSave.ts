import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";

@Entity('post_saves')
export class PostSave {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.postsSaved, { onDelete: 'CASCADE' }) // one user pode salvar varios posts
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Post, post => post.postSaves, { onDelete: 'CASCADE' }) // um post pode ser salvo por varios users
    @JoinColumn({ name: "post_id" })
    post!: Post;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    savedAt!: Date;
}
