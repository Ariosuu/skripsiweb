<template>
  <v-select
    class="ma-4"
    :items="['January', 'February']"
    flat
    variant="solo"
    density="compact"
    hide-details
    width="25%"
    v-model="currentMonth"
    prepend-inner-icon=""
  >
    <template v-slot:prepend-inner>
      <v-icon :icon="mdiFilter" size="sm" color="#207a9a" />
    </template>
  </v-select>

  <v-card class="ma-4" height="90%">
    <v-card class="ma-4" color="#D9D9D9" flat>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <pie-chart height="170" :series="salary" />
          </v-col>
          <v-col class="d-flex align-center">
            <v-row>
              <v-col cols="12">
                <span class="text-h4 font-weight-bold"> Monthly CTC </span>
                <br />
                <span class="text-h6"> Yearly CTC </span>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="2" class="earning">
                    <span class="text-h6 font-weight-bold"> Earnings </span>
                    <br />
                    <span class="text-subtitle">
                      {{ january }}
                    </span>
                  </v-col>
                  <v-col cols="2" class="reimburse">
                    <span class="text-h6 font-weight-bold"> Allowance </span>
                    <br />
                    <span class="text-subtitle">
                      {{ totalReimbursement() }}
                    </span>
                  </v-col>
                  <v-col cols="2" class="deduction">
                    <span class="text-h6 font-weight-bold"> Deduction </span>
                    <br />
                    <span class="text-subtitle">
                      {{ totalDeduction() }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-row class="ma-4">
      <v-col cols="12" class="pt-0">
        <v-card
          flat
          class="bg-color-transparent overflow-y-auto"
          height="440"
          max-height="500"
        >
          <span class="text-h5 font-weight-bold">Earning</span><br />
          <span
            v-for="item in earning"
            class="d-flex justify-space-between flex-row pa-2"
          >
            <div>{{ item.name }}</div>
            <div>
              {{ item.total }}
            </div>
          </span>

          <span class="text-h5 font-weight-bold">Allowance</span><br />
          <span
            v-for="item in reimbursement"
            class="d-flex justify-space-between flex-row pa-2"
          >
            <div>{{ item.name }}</div>
            <div>
              {{ item.total }}
            </div>
          </span>

          <span class="text-h5 font-weight-bold">Deduction</span><br />
          <span
            v-for="item in deduction"
            class="d-flex justify-space-between flex-row pa-2"
          >
            <div>{{ item.name }}</div>
            <div>
              {{ item.total }}
            </div>
          </span>
        </v-card>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12">
        <span
          class="text-h5 font-weight-bold d-flex justify-space-between flex-row"
        >
          <div>Total</div>
          <div>
            {{ totalSalary }}
          </div>
        </span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { mdiFilter, mdiLogout } from "@mdi/js";
import { ref } from "vue";
import PieChart from "@/components/PieChart.vue";

const earning = ref([
  { name: "Basic", total: 500000 },
  { name: "Communication Allowance", total: 250000 },
  { name: "Medical Allowance", total: 150000 },
]);

const deduction = ref([
  { name: "Absence", total: 500000 },
  { name: "Leave", total: 500000 },
]);

const reimbursement = ref([
  { name: "Business Expense", total: 750000 },
  { name: "Insurance", total: 650000 },
]);

const totalEarning = () => {
  let total = 0;
  for (let i = 0; i < earning.value.length; i++) {
    total += earning.value[i].total;
  }

  return total;
};

const totalReimbursement = () => {
  let total = 0;
  for (let i = 0; i < reimbursement.value.length; i++) {
    total += reimbursement.value[i].total;
  }

  return total;
};

const totalDeduction = () => {
  let total = 0;
  for (let i = 0; i < deduction.value.length; i++) {
    total += deduction.value[i].total;
  }

  return total;
};

const salary = ref([totalEarning(), totalReimbursement(), totalDeduction()]);
const totalSalary = ref(
  totalEarning() + totalReimbursement() - totalDeduction()
);
</script>

<style scoped>
.earning {
  border-left-style: solid;
  border-color: #69ff91;
}

.reimburse {
  border-left-style: solid;
  border-color: #69bcff;
}

.deduction {
  border-left-style: solid;
  border-color: #ff6969;
}
</style>
