import {Entity, BaseEntity, PrimaryGeneratedColumn, Column} from 'typeorm'
import {ObjectType, Field, ID} from 'type-graphql'

@Entity()
@ObjectType()
export class Todo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Field(() => String)
  @Column()
  desc: string

  @Field(() => String)
  @Column()
  user: string

  @Field(() => Boolean)
  @Column({
    default: false,
  })
  isDone: boolean
}
