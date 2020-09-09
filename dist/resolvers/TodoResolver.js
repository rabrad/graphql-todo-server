"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Todo_1 = require("../models/Todo");
const CreateTodoInput_1 = require("../inputs/CreateTodoInput");
const UpdateTodoInput_1 = require("../inputs/UpdateTodoInput");
let TodoResolver = class TodoResolver {
    todos() {
        return Todo_1.Todo.find();
    }
    todo(id) {
        return Todo_1.Todo.findOne({ where: { id } });
    }
    async createTodo(data) {
        const todo = Todo_1.Todo.create(data);
        await todo.save();
        return todo;
    }
    async updateTodo(id, data) {
        const todo = await Todo_1.Todo.findOne({ where: { id } });
        if (!todo)
            throw new Error('Todo not found!');
        Object.assign(todo, data);
        await todo.save();
        return todo;
    }
    async deleteTodo(id) {
        const todo = await Todo_1.Todo.findOne({ where: { id } });
        if (!todo)
            throw new Error('Todo not found!');
        await todo.remove();
        return true;
    }
};
__decorate([
    type_graphql_1.Query(() => [Todo_1.Todo]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "todos", null);
__decorate([
    type_graphql_1.Query(() => Todo_1.Todo),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "todo", null);
__decorate([
    type_graphql_1.Mutation(() => Todo_1.Todo),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateTodoInput_1.CreateTodoInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "createTodo", null);
__decorate([
    type_graphql_1.Mutation(() => Todo_1.Todo),
    __param(0, type_graphql_1.Arg('id')), __param(1, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateTodoInput_1.UpdateTodoInput]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "updateTodo", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoResolver.prototype, "deleteTodo", null);
TodoResolver = __decorate([
    type_graphql_1.Resolver()
], TodoResolver);
exports.TodoResolver = TodoResolver;
