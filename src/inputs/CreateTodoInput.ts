import {InputType, Field} from 'type-graphql'

@InputType()
export class CreateTodoInput {
  @Field()
  description: string
}
