<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">
      Approve Time Off
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
      <template v-slot:item.from="{ value }">
        {{ value.toLocaleDateString() }}
      </template>

      <template v-slot:item.to="{ value }">
        {{ value.toLocaleDateString() }}
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
      <v-card width="700" title="Employee Leave Request Form">
        <template v-slot:append>
          <v-btn :icon="mdiClose" flat size="sm" @click="closeDialog"></v-btn>
        </template>
        <v-card-text class="pa-4 pt-2">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Employee Name"
                v-model="requestForm.name"
                readonly
                variant="outlined"
                density="compact"
                width="auto"
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Position"
                v-model="requestForm.position"
                readonly
                variant="outlined"
                density="compact"
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="4" class="pb-0">
              <v-autocomplete
                label="Leave Type"
                type="string"
                :items="leaveType"
                v-model="requestForm.type"
                variant="outlined"
                density="compact"
                readonly
                required
              ></v-autocomplete>
            </v-col>

            <v-col cols="4">
              <v-date-input
                v-model="requestForm.from"
                label="From"
                prepend-icon=""
                variant="outlined"
                density="compact"
                hide-details
                readonly
              ></v-date-input>
            </v-col>
            <v-col cols="4">
              <v-date-input
                v-model="requestForm.to"
                label="To"
                prepend-icon=""
                variant="outlined"
                density="compact"
                hide-details
                readonly
              ></v-date-input>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Notes"
                variant="outlined"
                v-model="requestForm.notes"
                hide-details
                readonly
              ></v-textarea>
            </v-col>
            <v-col cols="12" class="d-flex justify-end align-end">
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
const leaveType = ["Sick", "Family", "Maternity"];

const headers = [
  {
    title: "Employee Name",
    value: "name",
    align: "start",
    sortable: true,
    width: "400px",
  },

  { title: "Leave Type", value: "type", align: "center", sortable: true },
  { title: "From", value: "from", align: "center", sortable: true },
  { title: "To", value: "to", align: "center", sortable: true },
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
    position: "Team Leader",
    type: "Family",
    from: new Date(),
    to: new Date(),
    status: "Pending",
    notes: "Eric stole my food",
  },
]);

const requestForm = reactive({
  name: "",
  position: "",
  type: null,
  fromTo: [], // Ini gak kepake harusnya disini
  from: new Date(),
  to: new Date(),
  notes: "",
  reason: "", // ini juga gak kepake i think
  status: "Pending",
});

const viewRequest = (x) => {
  requestForm.name = request.value[x].name;
  requestForm.position = request.value[x].position;
  requestForm.type = request.value[x].type;
  requestForm.from = request.value[x].from;
  requestForm.to = request.value[x].to;
  requestForm.notes = request.value[x].notes;

  console.log(requestForm);
  requestDialog.value = true;
};

const closeDialog = () => {
  requestForm.name = "";
  requestForm.position = "";
  requestForm.type = null;
  requestForm.from = new Date();
  requestForm.to = new Date();
  requestForm.notes = "";
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
