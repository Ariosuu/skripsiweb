<template>
  <v-card class="ma-5 pa-4">
    <h2>Payslip for {{ month }}</h2>

    <v-card class="my-4" color="#D9D9D9" flat>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <pie-chart height="170" :series="salary" />
          </v-col>
          <v-col class="d-flex align-center">
            <v-row>
              <v-col cols="12">
                <span class="text-h4 font-weight-bold">
                  Gross Pay: {{ formatIDR(grossPay) }}
                </span>
                <br />
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="2" class="earning">
                    <span class="text-h6 font-weight-bold"> Take Home </span>
                    <br />
                    <span class="text-subtitle">
                      {{ formatIDR(takeHome) }}
                    </span>
                  </v-col>

                  <v-col cols="2" class="allowance">
                    <span class="text-h6 font-weight-bold"> Allowance </span>
                    <br />
                    <span class="text-subtitle">
                      {{ formatIDR(totAllow) }}
                    </span>
                  </v-col>

                  <v-col cols="2" class="deduction">
                    <span class="text-h6 font-weight-bold"> Deduction </span>
                    <br />
                    <span class="text-subtitle">
                      {{ formatIDR(deduction) }}
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <h2>Payslip Details</h2>
    <v-divider color="black" thickness="1"></v-divider>
    <v-card color="#D9D9D9" flat>
      <v-col cols="12">
        <v-row>
          <v-col cols="3">
            <v-card color="#D9D9D9" flat>
              <v-card-title>{{ month }}</v-card-title>
              <v-card-subtitle>Paid Days: </v-card-subtitle>
            </v-card>
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
      class="my-4"
      flat
      variant="outlined"
      height="250px"
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
          <v-col cols="6" class="pa-0">
            <v-card height="150px" flat class="pl-2">
              <v-card-text
                class="d-flex justify-space-between align-center py-2"
              >
                <span>Basic</span>
                <span>{{ formatIDR(grossPay) }}</span>
              </v-card-text>
              <v-card-text
                class="d-flex justify-space-between align-center py-2"
              >
                <span>Transportation Allowance</span>
                <span>{{ formatIDR(transAllow) }}</span>
              </v-card-text>
              <v-card-text
                class="d-flex justify-space-between align-center py-2"
              >
                <span>Communication Allowance</span>
                <span>{{ formatIDR(comAllow) }}</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="0" class="d-flex justify-center align-center pa-0">
            <v-divider vertical color="black" thickness="1"></v-divider>
          </v-col>
          <v-col cols="6" class="pa-0">
            <v-card height="150px" flat class="pl-2">
              <v-card-text
                class="d-flex justify-space-between align-center py-2"
              >
                <span>BPJS</span>
                <span>{{ formatIDR(bpjs) }}</span>
              </v-card-text>
              <v-card-text
                class="d-flex justify-space-between align-center py-2"
              >
                <span>JHT</span>
                <span>{{ formatIDR(jht) }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="pa-0">
            <v-divider color="black" thickness="1"></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" class="pa-0">
            <v-card height="50px" flat class="pl-2">
              <v-card-text class="d-flex justify-space-between align-center">
                <span>Total Payment:</span>
                <span>{{ formatIDR(totalpay) }}</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="0" class="d-flex justify-center align-center pa-0">
            <v-divider vertical color="black" thickness="1"></v-divider>
          </v-col>
          <v-col cols="6" class="pa-0">
            <v-card height="50px" class="pl-2">
              <v-card-text class="d-flex justify-space-between align-center">
                <span>Total Deduction:</span>
                <span>{{ formatIDR(totaldeduct) }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
    <span class="text-h6 my-6">Take Home Pay : </span>
    <span class="text-h5 mb-4 font-weight-bold">{{ formatIDR(takeHome) }}</span>
  </v-card>
</template>

<script setup>
import { mdiFilter, mdiLogout } from "@mdi/js";
import { ref } from "vue";
import { useRoute } from "vue-router";
import PieChart from "@/components/PieChart.vue";
import { db } from "@/firebase/config";
import { collection, getDocs, updateDoc, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { projectAuth } from "@/firebase/config";

const auth = getAuth();
const route = useRoute();

const month = route.query.month;
const grossPay = Number(route.query.grossPay);
const reimburse = Number(route.query.reimburse);
const deduction = Number(route.query.deduction);
const takeHome = Number(route.query.takeHome);
const bpjs = Number(route.query.bpjs);
const jht = Number(route.query.jht);
const comAllow = Number(route.query.comAllow);
const transAllow = Number(route.query.transAllow);
const totAllow = comAllow + transAllow;
const totaldeduct = bpjs + jht;
const totalpay = grossPay + reimburse;

function formatIDR(value) {
  if (!value) return "-";
  const number =
    typeof value === "number"
      ? value
      : parseInt(String(value).replace(/\D/g, ""));
  return number.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

const salary = ref([takeHome, totAllow, deduction]);
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
.allowance {
  border-left-style: solid;
  border-color: #69bcff;
}
</style>
