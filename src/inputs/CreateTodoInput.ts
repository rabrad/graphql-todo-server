import {InputType, Field} from 'type-graphql'

@InputType()
export class CreateTodoInput {
  @Field()
  desc: string

  @Field()
  user: string
}
