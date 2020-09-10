import {ObjectType, Field, Int} from 'type-graphql'

@ObjectType()
export class StatisticsResponse {
  @Field(() => Int)
  open: number

  @Field(() => Int)
  completed: number

  @Field(() => Int)
  all: number
}
