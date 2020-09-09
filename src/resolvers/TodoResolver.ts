import {Resolver, Query, Arg, Mutation} from 'type-graphql'
import {Todo} from '../models/Todo'
import {MutationResponse} from '../models/Response/MutationResponse'
import {CreateTodoInput} from '../inputs/CreateTodoInput'
import {UpdateTodoInput} from '../inputs/UpdateTodoInput'
import {StatisticsResponse} from '../models/Response/StatisticsResponse'

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

  @Query(() => StatisticsResponse)
  async statistics(): Promise<StatisticsResponse> {
    const todos = await Todo.find()
    const openTodos = todos.filter(todo => !todo.isDone)
    const completedTodos = todos.filter(todo => todo.isDone)
    return {
      openTodoStatistics: {
        count: openTodos.length,
        todos: openTodos,
      },
      completedTodoStatistics: {count: completedTodos.length, todos: completedTodos},
    }
  }

  @Mutation(() => MutationResponse)
  async createTodo(@Arg('data') data: CreateTodoInput): Promise<MutationResponse> {
    const todo = Todo.create(data)
    await todo.save()
    return {affectedRows: 1, success: true, todo}
  }

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

  @Mutation(() => MutationResponse)
  async deleteTodo(@Arg('id') id: string): Promise<MutationResponse> {
    const todo = await Todo.findOne({where: {id}})
    if (!todo) throw new Error('Todo not found!')
    await todo.remove()
    return {affectedRows: 1, success: true}
  }

  @Mutation(() => MutationResponse)
  async deleteAllTodos(): Promise<MutationResponse> {
    const todoCount = await Todo.count()
    const deleteResult = await Todo.delete({})
    return {affectedRows: deleteResult.affected || todoCount, success: true}
  }
}
