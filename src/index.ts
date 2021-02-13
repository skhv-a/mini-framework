import { App } from "./core/App";
import { Component } from "./core/Component";
import { templateComponent } from "./core/utils/templateComponent";

type TitleProps = {
  name: string;
};

class Title extends Component<TitleProps> {
  constructor(props: TitleProps) {
    super({
      name: "Title",
      props,
      events: ["click"],
    });
  }

  click(e: MouseEvent) {
    e.stopPropagation();
    console.log("click from Title");
  }

  render() {
    return /* html */ `
      <h1>Title</h1>
      ${this.props.name}
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
