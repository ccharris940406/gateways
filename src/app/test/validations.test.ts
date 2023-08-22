import { describe, expect, it, should } from "vitest";
import { gatewayDevsLength, validateIvp4 } from "../utils/validations";

describe("validate ipv4 tests", () => {
  it("should be a boolean", () => {
    expect(typeof validateIvp4("123")).toBe("boolean");
  });
  it("should be false if it starts with 0", () => {
    expect(validateIvp4("0.1.1.1")).toBe(false);
  });
  it("should be false if it does not contain three sets of numbers separated by dots four times", () => {
    expect(validateIvp4("192.20.0.")).toBe(false);
    expect(validateIvp4("192..0.")).toBe(false);
    expect(validateIvp4(".20.0.")).toBe(false);
  });
  it("should be false if any separated number is grather than 255", () => {
    expect(validateIvp4("192.256.2.2")).toBe(false);
    expect(validateIvp4("1999.56.2.2")).toBe(false);
    expect(validateIvp4("192.6.2.2998")).toBe(false);
  });
  it("should be true if it is a correct ip addres", () => {
    expect(validateIvp4("192.168.0.1")).toBe(true);
  });
});

describe("validate gatewaysDevsLength", () => {
  it("should be a number", async () => {
    expect(typeof await gatewayDevsLength(1)).toBe("number");
  });
});
