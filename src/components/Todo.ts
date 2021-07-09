import { Component } from "@src/core/Component";
import { Button } from "./Button";

type Todo = { id: number; text: string };

type FormProps = {
  createTodo: (todo: Todo) => void;
};

class Form extends Component<FormProps> {
  constructor(props: ItemProps) {
    super({
      name: "Form",
      events: ["submit"],
      props,
    });
  }

  submit(e: Event) {
    e.preventDefault();
    const text = this.$root.querySelector("input")?.value ?? "";

    this.props.createTodo({ text, id: Date.now() });
  }

  render() {
    return /* html */ `
        <form>
          <input placeholder="new todo" required></input>
          &nbsp;
          <button>Create</button>
        </form>`;
  }
}

type ItemProps = { removeTodo: () => void; content: string };

class TodoItem extends Component<ItemProps> {
  constructor(props: ItemProps) {
    super({
      name: "TodoItem",
      props,
      components: { Button },
    });
  }

  render() {
    return /* html */ `
        <div>
          ${this.props.content}
          &nbsp;
          <Button :onClick=this.props.removeTodo :content="Done"/>
        </div>`;
  }
}

type TodoContainerState = {
  todos: Todo[];
};

export class TodoContainer extends Component<undefined, TodoContainerState> {
  constructor() {
    super({
      name: "TodoContainer",
      components: { TodoItem, Form },
      state: {
        todos: [],
      },
    });
  }

  removeTodoById = (id: number): void => {
    this.setState({ todos: this.state.todos.filter((t) => t.id !== id) });
  };

  createTodo = (todo: Todo): void => {
    this.setState({ todos: [...this.state.todos, todo] });
  };

  render(): string {
    return /* html */ `
        <div>
          <Form :createTodo=this.createTodo />
          ${this.state.todos
            .map(
              (todo) => /* html */ `
                <TodoItem 
                  :content="${todo.text}" 
                  :removeTodo=() => this.removeTodoById(${todo.id})
                />`
            )
            .join("")}
        </div>`;
  }
}
