import { mount, createLocalVue } from "@vue/test-utils";
import CompositionApi from "@vue/composition-api";
import AnalogClock from "@/components/AnalogClock/index";

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
