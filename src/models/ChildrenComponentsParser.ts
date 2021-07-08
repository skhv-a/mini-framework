/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "@src/core/Component";

export interface IChildrenComponentsParser {
  getExstingComponents(): Component[];
  getNonExstingComponents(): Component[];
}
