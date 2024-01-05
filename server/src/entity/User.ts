import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm"
import { CreateDateColumn,UpdateDateColumn } from "typeorm";
import {Post} from "./Post";
import {PostLike} from "./PostLike";
import {PostSave} from "./PostSave";
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

    @Column({nullable: true, length: 2200})
    bio!: string

    @Column({nullable: true})
    userImgUrl!: string

    // um user belongs to many posts
    @OneToMany(() => Post, post => post.user)
    posts!: Post[];

    // um user pode dar like am many posts
    @OneToMany(() => PostLike, postLike => postLike.post)
    postsLiked!: PostLike[];

    // um user pode salvar varios posts
    @OneToMany(() => PostSave, postSave => postSave.user)
    postsSaved!: PostSave[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at!: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at!: Date;
}
