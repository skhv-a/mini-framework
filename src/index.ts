import { App } from "./core/App";
import { Component } from "./core/Component";

type TitleProps = {
  name: string;
};

class Title extends Component<TitleProps> {
  constructor(props: TitleProps) {
    super({
      name: "Title",
      props,
    });
  }

  render() {
    return /* html */ `
      <div>
        <h1>Title</h1>
        ${this.props.name}
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
      children: Title.bind(null, { name: "alex" }),
    });
  }

  render() {
    return /* html */ `
      <div class='header'>
        Header ${this.children} 
        <button>${this.props.btnText}</button>
      </div>`;
  }
}

const app = new App("#root", {
  components: [Header.bind(null, { btnText: "buttom" })],
});
app.mount();
