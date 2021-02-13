import { App } from "./core/App";
import { Component } from "./core/Component";
import { templateComponent } from "./core/utils/templateComponent";

class TitleDescription extends Component<null> {
  constructor() {
    super({
      name: "TitleDescription",
      events: ["mouseup"],
    });
  }

  mouseup(e: MouseEvent) {
    e.stopPropagation();
    console.log("do not copy text :)");
  }

  render() {
    return /* html */ `
      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
    `;
  }
}

type TitleProps = {
  name: string;
};

class Title extends Component<TitleProps> {
  constructor(props: TitleProps) {
    super({
      name: "Title",
      props,
      components: { TitleDescription },
      events: ["click"],
    });
  }

  click(e: MouseEvent) {
    e.stopPropagation();
    console.log("click from Title");
  }

  render() {
    return /* html */ `
      <div> 
        <h1>Title</h1>
        ${this.props.name}
        ${templateComponent("TitleDescription")}
      </div>
  `;
  }
}

type BtnProps = { onClick: () => void };
class Button extends Component<BtnProps> {
  constructor(props: BtnProps) {
    super({
      name: "Button",
      props,
    });
  }

  render() {
    return /* html */ `
        <button style='margin-right:15px;'>Increment</button>
    `;
  }
}

class Header extends Component<undefined> {
  constructor() {
    super({
      name: "Button",
      components: { Button },
    });
    this.state = {
      counter: 0,
    };
  }

  increment = () => {
    this.setState();
  };

  render() {
    return /* html */ `
        <div style="height:100vh;display:flex;justify-content:center;align-items:center">
          ${templateComponent("Button", { onClick: this.increment })}
          ${this.state.counter}
        </div>
    `;
  }
}
const app = new App("#root", {
  components: [Header],
});
app.mount();
