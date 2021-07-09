import { Component } from "@src/core/Component";
import { Button } from "./Button";

type State = { isVisible: boolean };

export class Toggler extends Component<undefined, State> {
  constructor() {
    super({
      name: "Toggler",
      components: { Button },
      state: {
        isVisible: true,
      } as State,
    });
  }

  toggle = (): void => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render(): string {
    return /* html */ `
        <div>
          <div>${this.state.isVisible ? "Visible" : "Hidden"}</div>
          <Button :content="toggle" :onClick=this.toggle/>
        </div>`;
  }
}
