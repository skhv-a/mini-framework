import { normalizeTemplate } from "../../../src/core/utils/normalizeTemplate";

const TEMPLATE = /* html */ `
    <div>
        <Button 
        :onClick=this.increment 
        :name="alex"
        :age=18
        :message='hello world'
        :arr=["foo", "bar"]
        :sayHi=() => {
            console.log('Look at "this" magic ', this);
        }
        />
        Click the button
    </div>`;

const NORMALIZED_TEMPLATE = `<div><Button:onClick=this.increment:name="alex":age=18:message='hello world':arr=["foo", "bar"]:sayHi=() => {console.log('Look at "this" magic ', this);}/>Click the button</div>`;

describe("normalizeTemplate", () => {
  test("Props with tabs", () => {
    expect(normalizeTemplate(TEMPLATE)).toBe(NORMALIZED_TEMPLATE);
  });
});
