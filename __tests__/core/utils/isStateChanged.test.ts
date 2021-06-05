import { STATE } from "@mocks/states";
import { isStateChanged } from "@src/core/utils/isStateChanged";

const UPDATED_STATE = { foo: "bar" };

describe("isStateChanged", () => {
  it("State did not change", () => {
    expect(isStateChanged(STATE, STATE)).toBeFalsy();
  });

  it("State changed", () => {
    expect(isStateChanged(STATE, UPDATED_STATE)).toBeTruthy();
  });
});
