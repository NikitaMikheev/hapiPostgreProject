import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { City } from "./City";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    salt: string

    @Column()
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

}
