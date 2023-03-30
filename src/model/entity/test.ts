import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Test {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    test: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    age: number

}
