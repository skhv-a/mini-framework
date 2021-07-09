import { Component } from "@src/core/Component";
import { Button } from "./Button";

type State = { count: number };

export class Counter extends Component<undefined, State> {
  constructor() {
    super({ name: "Counter", components: { Button }, state: { count: 0 } });
  }

  decrement = (): void => {
    this.setState({ count: this.state.count - 1 });
  };

  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  render(): string {
    return /* html */ `
        <div>
          <Button :content="-" :onClick=this.decrement/>
          &nbsp;${this.state.count}&nbsp;
          <Button :content="+" :onClick=this.increment/>
        </div>`;
  }
}
