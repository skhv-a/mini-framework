import { normalizeTemplate } from "../../../src/core/utils/normalizeTemplate";

const TEMPLATE = /* html */ `
    <div>
        <Button :onClick=() => {alert("clicked");} />
        Click the button
        <ComponentWithALotOfProps 
          :one=1
          :two=2
          :three=3
          :four=4
          :five=5
        />
        <div class="nested-div">
          <div class="parent">
            <div class="child">
              <span class='text'>
                some  nested text    with       extra    spaces
              </span>
            </div>
          </div>
        </div>
    </div>`;

const NORMALIZED_TEMPLATE = `<div><Button :onClick=() => {alert("clicked");} />Click the button<ComponentWithALotOfProps :one=1 :two=2 :three=3 :four=4 :five=5 /><div class="nested-div"><div class="parent"><div class="child"><span class='text'>some nested text with extra spaces</span></div></div></div></div>`;

describe("normalizeTemplate", () => {
  test("Props with tabs", () => {
    expect(normalizeTemplate(TEMPLATE)).toBe(NORMALIZED_TEMPLATE);
  });
});
