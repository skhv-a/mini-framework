export const RAW_TEMPLATE = /* html */ `
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

export const NORMALIZED_TEMPLATE = `<div><Button :onClick=() => {alert("clicked");} />Click the button<ComponentWithALotOfProps :one=1 :two=2 :three=3 :four=4 :five=5 /><div class="nested-div"><div class="parent"><div class="child"><span class='text'>some nested text with extra spaces</span></div></div></div></div>`;
