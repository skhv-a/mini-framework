import { App } from "./core/App";
import { Component } from "./core/Component";

class Header extends Component {
  constructor() {
    super({
      name: "Header",
      template: /* html */ `<div class='header'>Header</div>`,
    });
  }
}

const app = new App("#root", { components: [Header] });
app.mount();
