<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Reimbursement</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-row>
    <v-col cols="4">
      <v-select
        class="ma-4"
        :items="['January', 'February']"
        flat
        variant="solo"
        density="compact"
        hide-details
        v-model="currentMonth"
        prepend-inner-icon=""
      >
        <template v-slot:prepend-inner>
          <v-icon :icon="mdiFilter" size="sm" color="#207a9a" />
        </template>
      </v-select>
    </v-col>
    <v-spacer />
    <v-col class="d-flex align-center justify-end pr-7">
      <v-btn flat color="#1985A1" @click="newReimburse"
        >Add New Reimburse</v-btn
      ></v-col
    >
  </v-row>

  <v-card class="ma-4 mt-0" height="90%">
    <v-card class="ma-4" color="#D9D9D9" flat>
      <v-card-title>Total Reimbursement</v-card-title>
      <v-card-text class="text-h3 font-weight-bold">Rp 999.999.999</v-card-text>
    </v-card>

    <v-data-table
      :headers="headers"
      hide-default-footer
      :items="reimbursement"
      class="px-4"
    >
      <template v-slot:item.date="{ value }">
        {{ value.toLocaleDateString() }}
      </template>

      <template v-slot:item.bill="{ value }">
        {{
          value.toLocaleString("id-id", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>

      <template v-slot:item.approved="{ value }">
        {{
          value.toLocaleString("id-id", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </template>

      <template v-slot:item.detail="{ item }">
        <v-btn
          icon
          flat
          size="sm"
          @click="viewReimburse(reimbursement.indexOf(item))"
        >
          <v-icon :icon="mdiEye" color="#1985A1" />
        </v-btn>
      </template>

      <template v-slot:item.status="{ value }">
        <v-chip :color="chipColor(value)">{{ value }}</v-chip>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="reimburseDialog" width="auto" persistent>
    <v-form @submit.prevent="test" v-model="isValid">
      <v-card
        width="1200"
        :title="isNew ? 'Add New Claim' : reimburseForm.claimId"
      >
        <template v-slot:append>
          <v-btn :icon="mdiClose" flat size="sm" @click="closeDialog"></v-btn>
        </template>

        <v-card-text class="pa-4 pt-2">
          <v-row>
            <v-col cols="8">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Customer Name"
                    v-model="reimburseForm.name"
                    disabled
                    variant="outlined"
                    density="compact"
                    width="auto"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-date-input
                    v-model="reimburseForm.date"
                    label="Date"
                    variant="outlined"
                    density="compact"
                    prepend-icon=""
                    :prepend-inner-icon="mdiCalendar"
                    hide-details
                    :readonly="!isNew"
                  ></v-date-input>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Amount"
                    v-model="reimburseForm.bill"
                    variant="outlined"
                    density="compact"
                    width="auto"
                    type="number"
                    hide-details
                    :readonly="!isNew"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="Notes"
                    variant="outlined"
                    v-model="reimburseForm.notes"
                    hide-details
                    :readonly="!isNew"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="4">
              <v-card color="#D9D9D9" flat class="fill-height">
                <v-card-text>PLACE HOLDER</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="3" v-if="!isNew">
              Claim Status :
              <v-chip :color="chipColor(reimburseForm.status)">
                {{ reimburseForm.status }}
              </v-chip>
            </v-col>
            <v-spacer></v-spacer>
            <v-col v-if="!isNew" class="d-flex align-center justify-end">
              Approved Amount :
              <span class="font-weight-bold">
                {{
                  reimburseForm.approved.toLocaleString("id-id", {
                    style: "currency",
                    currency: "IDR",
                  })
                }}
              </span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions v-if="isNew">
          <v-btn type="submit" text="Submit" color="#1985A1" variant="flat" />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { mdiFilter, mdiLogout, mdiEye, mdiClose, mdiCalendar } from "@mdi/js";
import { ref } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";

const currentMonth = ref("February");
const reimburseDialog = ref(false);
const isValid = ref(false);
const isNew = ref(false);

const headers = ref([
  { title: "Claim Number", key: "claimId", align: "start", width: 175 },
  { title: "Claim Date", key: "date", align: "center" },
  { title: "Total Bill", key: "bill", align: "start" },
  { title: "Approved Amount", key: "approved", align: "start" },
  { title: "Status", key: "status", align: "center", sortable: false },
  { title: "Detail", key: "detail", align: "center", sortable: false },
]);

const chipColor = (x) => {
  if (x == "Approved") {
    return "green";
  } else if (x == "Pending") {
    return "orange";
  } else if (x == "Rejected") {
    return "red";
  }
};

const reimbursement = ref([
  {
    name: "Daniel Garyo",
    claimId: "CL001",
    date: new Date(),
    bill: 2000000,
    approved: 1000000,
    status: "Approved",
    notes: "Eric stole my food",
  },
]);

const reimburseForm = ref({
  name: "Daniel Garyo",
  claimId: "",
  date: new Date(),
  bill: 0,
  approved: 0,
  status: "Pending",
  notes: "",
});

const newReimburse = () => {
  isNew.value = true;
  reimburseDialog.value = true;
};

const viewReimburse = (x) => {
  isNew.value = false;
  reimburseForm.value = reimbursement.value[x];
  reimburseDialog.value = true;
};

const closeDialog = () => {
  reimburseForm.value = {
    name: "Daniel Garyo",
    claimId: "",
    date: new Date(),
    bill: 0,
    approved: 0,
    status: "Pending",
    notes: "",
  };
  reimburseDialog.value = false;
};

const test = () => {
  if (isValid.value) {
    closeDialog();
  }
};
</script>
