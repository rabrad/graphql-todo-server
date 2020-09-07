import {Resolver, Query, Arg, Mutation} from 'type-graphql'
import {Todo} from '../models/Todo'
import {CreateTodoInput} from '../inputs/CreateTodoInput'
import {UpdateTodoInput} from '../inputs/UpdateTodoInput'

@Resolver()
export class TodoResolver {
  @Query(() => [Todo])
  todos(): Promise<Todo[]> {
    return Todo.find()
  }

  @Query(() => Todo)
  todo(@Arg('id') id: string): Promise<Todo | undefined> {
    return Todo.findOne({where: {id}})
  }

  @Mutation(() => Todo)
  async createTodo(@Arg('data') data: CreateTodoInput): Promise<Todo> {
    const todo = Todo.create(data)
    await todo.save()
    return todo
  }

  @Mutation(() => Todo)
  async updateTodo(@Arg('id') id: string, @Arg('data') data: UpdateTodoInput): Promise<Todo> {
    const todo = await Todo.findOne({where: {id}})
    if (!todo) throw new Error('Todo not found!')
    Object.assign(todo, data)
    await todo.save()
    return todo
  }

  @Mutation(() => Boolean)
  async deleteTodo(@Arg('id') id: string): Promise<boolean> {
    const todo = await Todo.findOne({where: {id}})
    if (!todo) throw new Error('Todo not found!')
    await todo.remove()
    return true
  }
}
