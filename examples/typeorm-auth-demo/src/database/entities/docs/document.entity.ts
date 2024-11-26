import { AbstractBaseTenantEntity } from "@aiofc/typeorm";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('documents')
export class Document extends AbstractBaseTenantEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    isActive: boolean;
}