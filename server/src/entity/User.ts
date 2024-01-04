import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm"
import { CreateDateColumn,UpdateDateColumn } from "typeorm";
import {Post} from "./Post";
import {PostLike} from "./PostLike";
@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    username! : string

    @Column()
    email!: string

    @Column()
    password!: string

    // um user belongs to many posts
    @OneToMany(() => Post, post => post.user)
    posts!: Post[];

    postsLiked!: PostLike[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at!: Date;
}
