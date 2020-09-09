import {ObjectType, Field, Int} from 'type-graphql'
import {Todo} from '../Todo'

@ObjectType()
export class MutationResponse {
  @Field(() => Int, {nullable: true, defaultValue: 1})
  affectedRows?: number | null

  @Field(() => Boolean, {nullable: true, defaultValue: true})
  success?: boolean

  @Field(() => Todo, {nullable: true})
  todo?: Todo
}
