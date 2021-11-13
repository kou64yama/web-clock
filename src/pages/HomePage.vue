<template>
  <analog-clock
    :time-zone="timeZone"
    :quartz="quartz"
    :duration="duration"
    @chronograph:start-or-stop="startOrStop"
    @chronograph:reset="reset"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useChronograph, useQuartz } from '../clock';
import AnalogClock from '../components/AnalogClock';

export default defineComponent({
  components: {
    AnalogClock,
  },
  setup: () => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    const { quartz } = useQuartz();
    const { duration, startOrStop, reset } = useChronograph(quartz);
    return { timeZone, quartz, duration, startOrStop, reset };
  },
});
</script>
