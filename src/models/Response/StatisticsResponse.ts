import {ObjectType, Field, Int} from 'type-graphql'
import {Todo} from '../Todo'

@ObjectType()
export class StatisticsResponse {
  @Field(() => Statistics)
  openTodoStatistics: Statistics

  @Field(() => Statistics)
  completedTodoStatistics: Statistics
}

@ObjectType()
export class Statistics {
  @Field(() => Int)
  count: number

  @Field(() => [Todo])
  todos: Todo[]
}
