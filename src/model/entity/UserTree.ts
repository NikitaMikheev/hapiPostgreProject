import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity()
export class UserTree {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column("int", { array: true })
    parentID: number[]

    @Column("int", { array: true })
    childID: number[]

    @Column("int", { array: true })
    partnerID: number[]

}