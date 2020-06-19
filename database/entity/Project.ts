import {Entity, Column, PrimaryGeneratedColumn} from "https://denolib.com/denolib/typeorm@v0.2.23-rc4/mod.ts";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({ type: String })
    name?: string;

    @Column({ type: String })
    description?: string;

    @Column({ type: Date })
    timestamp?: Date;

    state?: string

}
