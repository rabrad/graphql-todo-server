import {InputType, Field} from 'type-graphql'

@InputType()
export class UpdateTodoInput {
  @Field({nullable: true})
  desc?: string

  @Field({nullable: true})
  user?: string

  @Field({nullable: true})
  isDone?: boolean
}
