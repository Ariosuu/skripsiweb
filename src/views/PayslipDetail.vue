<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">
      Pay > Payslip > Details
    </p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card class="ma-5" height="95%">
    <h2 class="ma-4 ml-6">Payslip for Month</h2>

    <v-card class="ma-4" color="#D9D9D9" flat>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <pie-chart height="170" :series="salary" />
          </v-col>
          <v-col class="d-flex align-center">
            <v-row>
              <v-col cols="12">
                <span class="text-h4 font-weight-bold"> Gross Pay </span>
                <br />
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="2" class="earning">
                    <span class="text-h6 font-weight-bold"> Take Home </span>
                    <br />
                    <span class="text-subtitle"> money </span>
                  </v-col>

                  <v-col cols="2" class="deduction">
                    <span class="text-h6 font-weight-bold"> Deduction </span>
                    <br />
                    <span class="text-subtitle"> money </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <h2 class="ml-6">Payslip Details</h2>
    <v-divider color="#C5C3C6" thickness="2"></v-divider>
    <v-card class="ma-4" color="#D9D9D9" flat>
      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <v-card
              color="#D9D9D9"
              title="Month 2025"
              subtitle="Paid Days:"
              flat
            ></v-card>
          </v-col>
          <v-col cols="0" class="d-flex justify-center align-center py-2">
            <v-divider
              vertical
              color="black"
              thickness="2"
              style="height: 100%"
            ></v-divider>
          </v-col>
          <v-col cols="8">
            <v-card
              color="#D9D9D9"
              title="Bank Account Number: "
              subtitle="1234567890"
              flat
            ></v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-card>

    <v-card
      class="ma-4"
      flat
      variant="outlined"
      height="300px"
      style="--v-theme-outline-color: #d9d9d9; border-color: #d9d9d9"
    >
      <v-col cols="12">
        <v-row>
          <v-col cols="6" class="pa-0">
            <v-card
              title="Earnings"
              flat
              color="#D9D9D9"
              class="px-2"
              rounded="0"
            ></v-card>
          </v-col>
          <v-col cols="0" class="d-flex justify-center align-center pa-0">
            <v-divider
              vertical
              color="black"
              thickness="1"
              fill-height
              no-gutters
            ></v-divider>
          </v-col>
          <v-col cols="6" class="pa-0">
            <v-card
              title="Deductions"
              flat
              color="#D9D9D9"
              class="px-2"
              rounded="0"
            ></v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-divider
            vertical
            color="black"
            thickness="5"
            fill-height
            no-gutters
          ></v-divider>
        </v-row>
      </v-col>
    </v-card>
    <h2 class="ml-6">Net Pay:</h2>
  </v-card>
</template>

<script setup>
import { mdiFilter, mdiLogout } from "@mdi/js";
import { ref } from "vue";
import PieChart from "@/components/Chart.vue";

const salary = ref([50, 0, 50]);
</script>

<style scoped>
.earning {
  border-left-style: solid;
  border-color: #69ff91;
}

.deduction {
  border-left-style: solid;
  border-color: #ff6969;
}
</style>
