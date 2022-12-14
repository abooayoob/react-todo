export const dbApi = {
  todos: new Set<string>(["Do laundry", "Cook dinner"]),
  getTodos() {
    return new Promise<{ data: typeof dbApi.todos; timeoutId: number }>(
      (resolve) => {
        const timeoutId = window.setTimeout(() => {
          console.log(`getTodos`, this.todos);
          resolve({ data: this.todos, timeoutId });
        }, 300);
      }
    );
  },
  addTodo(todo: string) {
    return new Promise<{ data: string; timeoutId: number }>((resolve) => {
      console.log(`addTodo`, this.todos);
      const timeoutId = window.setTimeout(() => {
        this.todos.add(todo);
        resolve({ data: todo, timeoutId });
      }, 300);
    });
  },
  deleteTodo(todo: string) {
    return new Promise<{ data: string; timeoutId: number }>(
      (resolve, reject) => {
        console.log(`deleteTodo`, this.todos);
        const timeoutId = window.setTimeout(() => {
          const chance = Math.random();
          if (chance > 0.5) {
            this.todos.delete(todo);
            resolve({ data: todo, timeoutId });
          } else {
            reject(Error(`Error deleting "${todo}"`));
          }
        }, 300);
      }
    );
  },
};
