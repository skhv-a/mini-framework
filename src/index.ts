import { App } from "@core/App";
import { Component } from "@core/Component";

class Empty extends Component {
  constructor() {
    super({
      name: "Empty",
    });
  }

  render() {
    return "<div>empty</div>";
  }
}

class TitleDescription extends Component {
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

  componentDidMount = () => {
    console.log(this.name, "mounted");
  };

  componentDidUnmount = () => {
    console.log(this.name, "unmounted");
  };

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

type TitleState = {
  isDescriptionVisible: boolean;
};

class Title extends Component<TitleProps, TitleState> {
  constructor(props: TitleProps) {
    super({
      name: "Title",
      props,
      components: { TitleDescription },
      events: ["click"],
    });

    this.state = {
      isDescriptionVisible: true,
    };
  }

  click() {
    this.setState({ isDescriptionVisible: !this.state.isDescriptionVisible });
  }

  render() {
    return /* html */ `
      <div class='Title'> 
        <h1>Title toggler</h1>
        ${this.props.name}&nbsp; 
        ${this.state.isDescriptionVisible ? "<TitleDescription />" : "no title"}
        <TitleDescription />
      </div>
  `;
  }
}

type BtnProps = { onClick: () => void };
class Button extends Component<BtnProps> {
  constructor(props: BtnProps) {
    super({ name: "Button", events: ["click"], props });
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

type HeaderState = {
  counter: number;
};

class Header extends Component<undefined, HeaderState> {
  constructor() {
    super({
      name: "Header",
      components: { Button, Title, Empty },
    });
    this.state = {
      counter: 1,
    };
  }

  increment = () => {
    console.log("click");

    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return /* html */ `
        <div class="Header" style="height:100vh;display:flex;justify-content:center;align-items:center">
        <Button :onClick=this.increment />
        <Empty/>
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

new App("#root", Header).mount();
