<template>
  <VueApexCharts
    type="donut"
    :options="chartOptions"
    :series="props.series"
  ></VueApexCharts>
</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";
import { ref } from "vue";

const props = defineProps({
  series: {
    type: Array,
    required: false,
    default: [50, 50],
  },
});

const chartOptions = ref({
  chart: {
    type: "donut",
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 5,
  },
  labels: ["Earning", "Deduction"],
  colors: ["#69ff91", "#ff6969"],
  tooltip: {
    y: {
      formatter: function (val, opts) {
        return val.toLocaleString(undefined, {
          style: "currency",
          currency: "IDR",
        });
      },
    },
  },
});

const series = ref([30, 70]);
</script>
