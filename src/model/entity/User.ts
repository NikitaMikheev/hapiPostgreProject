import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { City } from "./City";

export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    salt: string

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string | null

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    age: number

    @ManyToOne(() => City, (city) => city.users)
    city_user: City;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role: Role

}
