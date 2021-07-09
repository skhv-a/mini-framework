import { Component } from "@src/core/Component";

type Props = { onClick: () => void; content: string };

export class Button extends Component<Props> {
  constructor(props: Props) {
    super({ name: "Button", props, events: ["click"] });
  }

  click(): void {
    this.props.onClick();
  }

  render(): string {
    return /* html */ `<button>${this.props.content}</button>`;
  }
}
