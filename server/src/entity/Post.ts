import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {PostLike} from "./PostLike";
import * as url from "url";
import {PostSave} from "./PostSave";


@Entity('posts')
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    id !: number

    @Column({length: 2200})
    caption !: string

    @Column({length: 2200, array: true})
    tags !: string

    @Column()
    imageUrl !: string

    @Column()
    imageId !: string

    @Column({length: 2200})
    location !: string

    // varios posts belongs to one user
    @ManyToOne(() => User, user => user.posts, {onDelete: 'CASCADE'}) // caso o user seja deletado, deletar tambem os posts indexados a ele
    user!: User | null;

    // um post pode receber varios likes
    @OneToMany(() => PostLike, postLike => postLike.post)
    postLikes!: PostLike[];

    // um post pode ser salvo por varios users
    @OneToMany(() => PostSave, postSave => postSave.post)
    postSaves!: PostSave[];

    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)"})
    public created_at!: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
    public updated_at!: Date;
}