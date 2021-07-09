import { App } from "@core/App";
import { Component } from "@core/Component";
import { Counter } from "@components/Counter";
import { Toggler } from "@components/Toggler";
import { TodoContainer } from "@components/Todo";

class Container extends Component {
  constructor() {
    super({
      name: "Container",
      components: { Counter, Toggler, TodoContainer },
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
        <hr/>
        <TodoContainer/>
      </div>`;
  }
}

new App("#root", Container).mount();
