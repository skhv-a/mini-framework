import { App } from "@core/App";
import { Component } from "@core/Component";

type ButtonProps = { onClick: () => void; content: string };

class Button extends Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super({ name: "Button", props, events: ["click"] });
  }

  click() {
    this.props.onClick();
  }

  render() {
    return /* html */ `<button>${this.props.content}</button>`;
  }
}

class Toggler extends Component<undefined, { isVisible: boolean }> {
  constructor() {
    super({
      name: "Toggler",
      components: { Button },
      state: {
        isVisible: true,
      },
    });
  }

  toggle = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return /* html */ `
      <div>
        <div>${this.state.isVisible ? "Visible" : "Hidden"}</div>
        <Button :content="toggle" :onClick=this.toggle/>
      </div>`;
  }
}

class Counter extends Component<undefined, { count: number }> {
  constructor() {
    super({ name: "Counter", components: { Button }, state: { count: 0 } });
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return /* html */ `
      <div>
        <Button :content="-" :onClick=this.decrement/>
        &nbsp;${this.state.count}&nbsp;
        <Button :content="+" :onClick=this.increment/>
      </div>`;
  }
}

class Container extends Component {
  constructor() {
    super({
      name: "Container",
      components: { Counter, Toggler },
    });
  }

  render() {
    return /* html */ `
      <div style=text-align:center;>
        <h1>Declarative mini-framework for SPA without Virtual DOM from scratch.</h1>
        <p>Technologies TypeScript, Webpack, ESlint, Babel, Jest</p>
        <p>Examples:</p>
        <Counter/>
        <hr/>
        <Toggler/>
      </div>`;
  }
}

new App("#root", Container).mount();
