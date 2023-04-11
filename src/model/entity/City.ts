import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { User } from "./User"

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    city: string

    @OneToMany(() => User, (user) => user.city_user)
    users: User[]
}