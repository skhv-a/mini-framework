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

type HeaderProps = {
  btnText: string;
};

class Header extends Component<HeaderProps> {
  constructor(props: HeaderProps) {
    super({
      name: "Header",
      props,
      events: ["click"],
      components: { Title },
    });
  }

  click(e: MouseEvent) {
    console.log(e);
  }

  render() {
    return /* html */ `
      <div class='header' data-about="Elephants">
        Header ${templateComponent("Title", { name: "alex" })}
        <button>${this.props.btnText}</button>
      </div>`;
  }
}

const app = new App("#root", {
  components: [Header.bind(null, { btnText: "buttom" })],
});
app.mount();
