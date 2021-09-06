<template>
  <analog-clock
    :quartz="quartz"
    :offset="offset"
    :duration="duration"
    @chronograph:start-or-stop="startOrStop"
    @chronograph:reset="reset"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useChronograph, useQuartz } from '../clock';
import AnalogClock from '../components/AnalogClock';

const offset = new Date(0).getTimezoneOffset();

export default defineComponent({
  components: {
    AnalogClock,
  },
  setup: () => {
    const { quartz } = useQuartz();
    const { duration, startOrStop, reset } = useChronograph(quartz);
    return { quartz, offset, duration, startOrStop, reset };
  },
});
</script>
