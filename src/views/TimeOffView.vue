<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Time Off</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card class="ma-4" height="95%">
    <v-card-text>
      <v-card flat color="#D9D9D9">
        <v-card-title class="pa-6">
          <div class="text-h5 font-weight-bold d-flex justify-space-between">
            <span>
              Leave Remaining :
              <span style="color: #1985a1">{{ leaveRemaining }} Days</span>
            </span>

            <span>
              <v-btn color="#1985A1" flat @click="openDialogRequest()">
                Request Leave
              </v-btn>
            </span>
          </div>
        </v-card-title>
      </v-card>

      <v-row class="pt-4">
        <v-col>
          <span class="pl-2 text-h6 font-weight-bold">Leave Request</span>
          <v-data-table
            :headers="headers"
            :items="timeRequest"
            hide-default-footer
          >
            <template v-slot:item.detail="{ item }">
              <v-btn
                icon
                flat
                size="sm"
                @click="openDialogDetail(timeRequest.indexOf(item))"
              >
                <v-icon :icon="mdiEye" color="#1985A1" />
              </v-btn>
            </template>

            <template v-slot:item.from="{ value }">
              {{ value.toLocaleDateString() }}
            </template>

            <template v-slot:item.to="{ value }">
              {{ value.toLocaleDateString() }}
            </template>

            <template v-slot:item.status="{ value }">
              <v-chip :color="chipColor(value)">{{ value }}</v-chip>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-dialog v-model="dialog" width="auto" persistent>
    <v-form @submit.prevent="test" v-model="isValid">
      <v-card width="700" title="Employee Leave Request Form">
        <template v-slot:append>
          <v-btn :icon="mdiClose" flat size="sm" @click="closeDialog"></v-btn>
        </template>
        <v-card-text class="pa-4 pt-2">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Employee Name"
                v-model="request.name"
                disabled
                variant="outlined"
                density="compact"
                width="auto"
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Position"
                v-model="request.position"
                disabled
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
                v-model="request.type"
                variant="outlined"
                density="compact"
                :rules="[rules.required('You have to fill this field')]"
                :readonly="isDetail"
                required
              ></v-autocomplete>
            </v-col>

            <v-col cols="4" v-if="isDetail">
              <v-date-input
                v-model="request.from"
                label="From"
                prepend-icon=""
                variant="outlined"
                density="compact"
                hide-details
                readonly
              ></v-date-input>
            </v-col>
            <v-col cols="4" v-if="isDetail">
              <v-date-input
                v-model="request.to"
                label="To"
                prepend-icon=""
                variant="outlined"
                density="compact"
                hide-details
                readonly
              ></v-date-input>
            </v-col>

            <v-col class="pb-0" v-if="isRequest">
              <v-date-input
                v-model="request.fromTo"
                label="From - To"
                variant="outlined"
                density="compact"
                :rules="[rules.required('You have to fill this field')]"
                :readonly="isDetail"
                :min="request.fromTo.length ? request.fromTo[0] : tommorow()"
                :max="daysPlusLeaveRemaining(request.fromTo[0])"
                :allowed-dates="allowedDates"
                multiple="range"
                required
              ></v-date-input>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Notes"
                variant="outlined"
                v-model="request.notes"
                hide-details
                :readonly="isDetail"
              ></v-textarea>
            </v-col>

            <v-col cols="3" v-if="isDetail">
              Status :
              <v-chip :color="chipColor(request.status)">
                {{ request.status }}
              </v-chip>
            </v-col>
            <v-col v-if="request.status == 'Rejected'">
              <v-text-field
                v-model="request.reason"
                label="Reason"
                variant="outlined"
                hide-details
                density="compact"
                :readonly="isDetail"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn type="submit" text="Submit" color="#1985A1" variant="flat" />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { mdiClose, mdiEye, mdiLogout } from "@mdi/js";
import { ref, reactive } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";
import { useRules } from "vuetify/labs/rules";

const dialog = ref(false);
const leaveRemaining = ref(12);
const timeRequest = ref([
  {
    name: "Daniel Garyo",
    position: "Employee",
    type: "Diddy Do It",
    fromTo: [],
    from: new Date(),
    to: new Date(),
    notes: "Baby Powder",
    reason: "P.Diddy",
    status: "Approved",
  },
  {
    name: "Daniel Garyo",
    position: "Employee",
    type: "Diddy Do It",
    from: new Date(),
    to: new Date(),
    notes: "Baby Powder",
    reason: "P.Diddy",
    status: "Rejected",
  },
]);
const request = ref({
  name: "Daniel Garyo",
  position: "Employee",
  type: null,
  fromTo: [],
  from: new Date(),
  to: new Date(),
  notes: "",
  reason: "",
  status: "Pending",
});
const leaveType = ["Sick", "Family", "Maternity"];
const isRequest = ref(false);
const isDetail = ref(false);
const isValid = ref(false);

const rules = useRules();

const headers = ref([
  { title: "Type", key: "type", align: "start" },
  { title: "From", key: "from", align: "center" },
  { title: "To", key: "to", align: "center" },
  { title: "Notes", key: "notes", align: "start" },
  { title: "Status", key: "status", align: "center", sortable: false },
  { title: "Detail", key: "detail", align: "center", sortable: false },
]);

const tommorow = () => {
  let today = new Date();
  today.setDate(today.getDate() + 1);

  return today.toLocaleDateString();
};

const daysPlusLeaveRemaining = (x) => {
  if (x) {
    const dateStart = new Date();
    dateStart.setDate(x.getDate());
    dateStart.setMonth(x.getMonth());
    dateStart.setFullYear(x.getFullYear());

    if (leaveRemaining.value <= 6 - dateStart.getDay()) {
      dateStart.setDate(x.getDate() + leaveRemaining.value - 1);
    } else if (leaveRemaining.value >= 6 - dateStart.getDay()) {
      if (leaveRemaining.value <= 6) {
        dateStart.setDate(x.getDate() + leaveRemaining.value - 1 + 2);
      } else if (leaveRemaining.value > 6) {
        for (let i = leaveRemaining.value; i > 0; i--) {
          dateStart.setDate(dateStart.getDate() + 1);
          if (dateStart.getDay() == 6) {
            dateStart.setDate(dateStart.getDate() + 2);
          }
        }
        dateStart.setDate(dateStart.getDate() - 1);
      }
    }
    return dateStart.toLocaleDateString();
  }
};

const chipColor = (x) => {
  if (x == "Approved") {
    return "green";
  } else if (x == "Pending") {
    return "orange";
  } else if (x == "Rejected") {
    return "red";
  }
};

const openDialogRequest = () => {
  isRequest.value = true;
  dialog.value = true;
};

const openDialogDetail = (x) => {
  isDetail.value = true;
  request.value = timeRequest.value[x];
  dialog.value = true;
};

const closeDialog = () => {
  isRequest.value = false;
  isDetail.value = false;
  dialog.value = false;
  request.value = {
    name: "Daniel Garyo",
    position: "Employee",
    type: null,
    fromTo: [],
    notes: "",
    status: "",
  };
};

function allowedDates(val) {
  if (val.getDay() == 0 || val.getDay() == 6) {
    return false;
  } else {
    return true;
  }
}
const test = () => {
  if (isValid.value) {
    request.value.from = request.value.fromTo[0];
    request.value.to = request.value.fromTo[request.value.fromTo.length - 1];

    timeRequest.value.unshift(request.value);
    closeDialog();
  }
};
</script>
