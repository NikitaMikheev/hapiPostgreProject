import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Test {

    @PrimaryGeneratedColumn()
    id: number

}