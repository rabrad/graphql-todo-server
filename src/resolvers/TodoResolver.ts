import {Resolver, Query, Arg, Mutation, UseMiddleware} from 'type-graphql'
import {Todo} from '../models/Todo'
import {MutationResponse} from '../models/Response/MutationResponse'
import {CreateTodoInput} from '../inputs/CreateTodoInput'
import {UpdateTodoInput} from '../inputs/UpdateTodoInput'
import {StatisticsResponse} from '../models/Response/StatisticsResponse'
import {isAuthenticated} from '../middlewares/isAuthenticated'

@Resolver()
export class TodoResolver {
  @UseMiddleware(isAuthenticated)
  @Query(() => [Todo])
  todos(): Promise<Todo[]> {
    return Todo.find()
  }

  @UseMiddleware(isAuthenticated)
  @Query(() => Todo)
  todo(@Arg('id') id: string): Promise<Todo | undefined> {
    return Todo.findOne({where: {id}})
  }

  @UseMiddleware(isAuthenticated)
  @Query(() => StatisticsResponse)
  async statistics(): Promise<StatisticsResponse> {
    const todos = await Todo.find()
    const open = todos.filter(todo => !todo.isDone).length
    const completed = todos.filter(todo => todo.isDone).length
    return {
      open,
      completed,
    }
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => MutationResponse)
  async createTodo(@Arg('data') data: CreateTodoInput): Promise<MutationResponse> {
    const todo = Todo.create(data)
    await todo.save()
    return {affectedRows: 1, success: true, todo}
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => MutationResponse)
  async updateTodo(
    @Arg('id') id: string,
    @Arg('data') data: UpdateTodoInput,
  ): Promise<MutationResponse> {
    const todo = await Todo.findOne({where: {id}})
    if (!todo) throw new Error('Todo not found!')
    Object.assign(todo, data)
    const updatedTodo = await todo.save()
    return {affectedRows: 1, success: true, todo: updatedTodo}
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => MutationResponse)
  async deleteTodo(@Arg('id') id: string): Promise<MutationResponse> {
    const todo = await Todo.findOne({where: {id}})
    if (!todo) throw new Error('Todo not found!')
    await todo.remove()
    return {affectedRows: 1, success: true}
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => MutationResponse)
  async deleteAllTodos(): Promise<MutationResponse> {
    const todoCount = await Todo.count()
    const deleteResult = await Todo.delete({})
    return {affectedRows: deleteResult.affected || todoCount, success: true}
  }
}
