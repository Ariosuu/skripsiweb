<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">
      Approve Reimbursement
    </p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card max-height="800" class="ma-4">
    <v-data-table
      :items="request"
      :headers="headers"
      hide-default-footer
      class="px-4"
      height="800"
      items-per-page="-1"
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

      <template v-slot:item.view="{ item }">
        <v-btn icon flat size="sm" @click="viewRequest(request.indexOf(item))">
          <v-icon :icon="mdiEye" color="#1985A1" />
        </v-btn>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="requestDialog" width="auto" persistent>
    <v-form v-model="isValid" @submit.prevent>
      <v-card width="1200" title="Claim Detail">
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
                    v-model="requestForm.name"
                    readonly
                    variant="outlined"
                    density="compact"
                    width="auto"
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-date-input
                    v-model="requestForm.date"
                    label="Date"
                    variant="outlined"
                    density="compact"
                    prepend-icon=""
                    :prepend-inner-icon="mdiCalendar"
                    hide-details
                    readonly
                  ></v-date-input>
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    label="Amount"
                    v-model="requestForm.bill"
                    variant="outlined"
                    density="compact"
                    width="auto"
                    type="number"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-1">
                  <v-textarea
                    label="Notes"
                    variant="outlined"
                    v-model="requestForm.notes"
                    hide-details
                    no-resize
                    rows="7"
                    readonly
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-img :src="requestForm.receiptImage" height="390"></v-img>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="Approve Amount"
                v-model="requestForm.approved"
                variant="outlined"
                density="compact"
                width="auto"
                type="number"
                :rules="[rules.required('You have to fill this field'), noZero]"
              ></v-text-field>
            </v-col>

            <v-col cols="6" class="d-flex justify-end align-end">
              <v-btn
                flat
                color="#1985A1"
                @click="decision('Approve')"
                class="mr-4"
                type="submit"
                >Approve
              </v-btn>
              <v-btn
                flat
                color="#1985A1"
                @click="decision('Reject')"
                type="submit"
                >Reject
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { mdiCalendar, mdiClose, mdiEye, mdiLogout } from "@mdi/js";
import { reactive, ref } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";
import { useRules } from "vuetify/labs/rules";

const requestDialog = ref(false);
const isValid = ref(false);
const rules = useRules();

const noZero = (x) => {
  if (x == 0) {
    return "Amount Cannot Be Zero";
  }
};

const headers = [
  {
    title: "Employee Name",
    value: "name",
    align: "start",
    sortable: true,
    width: "500px",
  },
  { title: "Claim Date", value: "date", align: "center", sortable: true },
  { title: "Total Bill", value: "bill", align: "center", sortable: true },
  {
    title: "View Request",
    value: "view",
    align: "center",
    sortable: true,
    width: "150px",
  },
];

const request = ref([
  {
    name: "Daniel Garyo",
    date: new Date(),
    bill: 2000000,
    approved: 0,
    status: "Pending",
    notes: "Eric stole my food",
    receiptFile: null,
    receiptImage:
      "https://forum.sambapos.com/uploads/default/optimized/3X/8/f/8ffc4d77fe5175cf83fbc4bbed52d7cfdd031d71_2_690x1000.jpeg",
  },
]);

const requestForm = reactive({
  name: "",
  date: new Date(),
  bill: 0,
  approved: 0,
  status: "Pending",
  notes: "",
  receiptFile: null,
  receiptImage: null,
});

const viewRequest = (x) => {
  requestForm.name = request.value[x].name;
  requestForm.date = request.value[x].date;
  requestForm.bill = request.value[x].bill;
  requestForm.approved = request.value[x].approved;
  requestForm.notes = request.value[x].notes;
  requestForm.receiptFile = request.value[x].receiptFile;
  requestForm.receiptImage = request.value[x].receiptImage;
  requestDialog.value = true;
};

const closeDialog = () => {
  requestForm.name = "";
  requestForm.date = new Date();
  requestForm.bill = 0;
  requestForm.approved = 0;
  requestForm.notes = "";
  requestForm.receiptFile = null;
  requestForm.receiptImage = null;
  requestDialog.value = false;
};

const decision = (x) => {
  if (isValid.value) {
    if (x == "Approve") {
      // logic for approve
    }
    closeDialog();
  }

  if (x == "Reject") {
    // logic for reject

    closeDialog();
  }
};
</script>
