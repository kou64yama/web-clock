import { mount, createLocalVue } from "@vue/test-utils";
import CompositionApi from "@vue/composition-api";
import AnalogClock from "@/components/AnalogClock/index";
import * as utils from "@/components/AnalogClock/utils";
import * as format from "@/components/AnalogClock/format";

const localVue = createLocalVue();
localVue.use(CompositionApi);

describe("AnalogClock", () => {
  it("renders correctly", () => {
    const wrapper = mount(AnalogClock, {
      localVue,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});

describe("utils/gear", () => {
  it("converts time to angle", () => {
    const gear = utils.gear(utils.MINUTE, 360);
    expect(gear(0)).toEqual(0);
    expect(gear(15 * utils.SECOND)).toEqual(90);
    expect(gear(30 * utils.SECOND)).toEqual(180);
    expect(gear(45 * utils.SECOND)).toEqual(270);
    expect(gear(60 * utils.SECOND)).toEqual(0);
  });
});

describe("format/chronograph", () => {
  it.each([
    [0, "00°00'00.000\""],
    [100, "00°00'00.100\""],
    [999, "00°00'00.999\""],
    [utils.SECOND, "00°00'01.000\""],
    [59 * utils.SECOND, "00°00'59.000\""],
    [1 * utils.MINUTE, "00°01'00.000\""],
    [59 * utils.MINUTE, "00°59'00.000\""],
    [1 * utils.HOUR, "01°00'00.000\""],
    [99 * utils.HOUR, "99°00'00.000\""],
  ])("formats the elapsed time for display", (duration, formatted) => {
    expect(format.chronograph(duration)).toEqual(formatted);
  });
});
