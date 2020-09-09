import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import {ObjectType, Field, ID} from 'type-graphql'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Field(() => String)
  @Column({unique: true})
  email: string

  @Column()
  password: string
}
