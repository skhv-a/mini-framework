import { App } from "@core/App";
import { Component } from "@core/Component";

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
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </span>
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
      <div class='Title'> 
        <h1>Title</h1>
        ${this.props.name} 
        <TitleDescription  />
      </div>
  `;
  }
}

type BtnProps = { onClick: () => void };
class Button extends Component<BtnProps> {
  constructor(props: BtnProps) {
    super({
      name: "Button",
      events: ["click"],
      props,
    });
  }

  click() {
    this.props.onClick();
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
      name: "Header",
      components: { Button, Title },
    });
    this.state = {
      counter: 1,
    };
  }

  increment = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return /* html */ `
        <div class="Header" style="height:100vh;display:flex;justify-content:center;align-items:center">
        <Button 
          :onClick=this.increment 
          :name="alex"
          :age=18
          :a='sfdafs fsda'
          :arr=["foo", "bar"]
          :sayHi=() => {
            console.log('Look at "this" magic ', this);
          }
        />

          ${this.state.counter} 
          ${
            this.state.counter > 1
              ? "Title disapeared"
              : /* html */ `
                  <Title :name="alex"/>
                  click the button to toggle title
                    `
          }
        </div>
    `;
  }
}
const app = new App("#root", {
  components: [Header],
});
app.mount();
