const probability = {
  good: {
    upper: 0.95,
    lower: 0.05,
  },
  medium: {
    upper: 0.75,
    lower: 0.25,
  },
  bad: {
    upper: 0.55,
    lower: 0.45,
  },
};

export const dbApi = {
  todos: new Set<string>(["Do laundry", "Cook dinner"]),
  getTodos() {
    return new Promise<{ data: typeof dbApi.todos; timeoutId: number }>(
      (resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
          const chance = Math.random();
          const { upper, lower } = probability.good;
          if (chance < upper && chance > lower) {
            resolve({ data: this.todos, timeoutId });
          } else {
            reject(Error(`Error getting todos`));
          }
        }, 300);
      }
    );
  },
  addTodo(todo: string) {
    return new Promise<{ data: string; timeoutId: number }>(
      (resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
          const chance = Math.random();
          const { upper, lower } = probability.good;
          if (chance < upper && chance > lower) {
            this.todos.add(todo);
            resolve({ data: todo, timeoutId });
          } else {
            reject(Error(`Error adding "${todo}"`));
          }
        }, 300);
      }
    );
  },
  deleteTodo(todo: string) {
    return new Promise<{ data: string; timeoutId: number }>(
      (resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
          const chance = Math.random();
          const { upper, lower } = probability.bad;

          if (chance < upper && chance > lower) {
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
