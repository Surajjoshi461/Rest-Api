import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    userId!: string;

    @Column({ type: 'text', nullable: false })
    firstName!: string;

    @Column({ type: 'text', nullable: false })
    lastName!: string;

    @Column({ type: 'text', nullable: false })
    email!: string;

    @Column({ type: 'text', nullable: false })
    password!: string;

    @Column({type: 'text',  nullable: false })
    sessionId!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}