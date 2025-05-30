<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Time Off</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-card class="ma-4">
    <v-card-text>
      <v-card flat color="#D9D9D9">
        <v-card-title class="pa-6">
          <div class="text-h5 font-weight-bold d-flex justify-space-between">
            <span>
              Leave Remaining : <span style="color: #1985a1">5 Days</span>
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
        <v-col cols="8">
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

            <template v-slot:item.status="{ value }">
              <v-chip :color="chipColor(value)">{{ value }}</v-chip>
            </template>
          </v-data-table>
        </v-col>
        <v-col cols="4">
          <v-card flat color="#D9D9D9">
            <v-card-title class="text-h6">Leave Request History</v-card-title>
            <v-card-text>
              <v-card flat>
                <v-card-text class="pa-0 bg-transparent|">
                  <v-card
                    title="Sick Leave"
                    subtitle="18/06/2048 - 26/06/2048"
                    flat
                    class="pa-0"
                  >
                    <template v-slot:append>
                      <v-chip color="green">Approved</v-chip>
                    </template>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-dialog v-model="dialog" width="auto">
    <v-card width="700" title="Employee Leave Request Form">
      <template v-slot:append>
        <v-btn :icon="mdiClose" flat size="sm" @click="closeDialog"></v-btn>
      </template>
      <v-card-text class="pa-4 pt-2">
        <form @submit.prevent>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Employee Name"
                v-model="request.name"
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
                v-model="request.position"
                readonly
                variant="outlined"
                density="compact"
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="4">
              <v-autocomplete
                label="Leave Type"
                type="string"
                :items="leaveType"
                v-model="request.type"
                variant="outlined"
                density="compact"
                hide-details
                :readonly="isDetail"
              ></v-autocomplete>
            </v-col>

            <v-col cols="4">
              <v-date-input
                v-model="request.from"
                label="From"
                prepend-icon=""
                variant="outlined"
                density="compact"
                hide-details
                :readonly="isDetail"
              ></v-date-input>
            </v-col>
            <v-col cols="4">
              <v-date-input
                v-model="request.to"
                label="To"
                prepend-icon=""
                variant="outlined"
                density="compact"
                hide-details
                :readonly="isDetail"
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
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          type="submit"
          text="Submit"
          color="#1985A1"
          variant="flat"
          @click="test"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { mdiClose, mdiEye, mdiLogout } from "@mdi/js";
import { ref, reactive } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";

const dialog = ref(false);
const timeRequest = ref([
  {
    name: "Daniel Garyo",
    position: "Employee",
    type: "Diddy Do It",
    from: new Date().toLocaleDateString(),
    to: new Date().toLocaleDateString(),
    notes: "Baby Powder",
    reason: "P.Diddy",
    status: "Approved",
  },
  {
    name: "Daniel Garyo",
    position: "Employee",
    type: "Diddy Do It",
    from: new Date().toLocaleDateString(),
    to: new Date().toLocaleDateString(),
    notes: "Baby Powder",
    reason: "P.Diddy",
    status: "Rejected",
  },
]);
const request = ref({
  name: "Daniel Garyo",
  position: "Employee",
  type: null,
  from: new Date().toLocaleDateString(),
  to: new Date().toLocaleDateString(),
  notes: "",
  reason: "",
  status: "",
});
const leaveType = ["Sick", "Family", "Maternity"];
const isRequest = ref(false);
const isDetail = ref(false);

const headers = ref([
  { title: "Type", key: "type", align: "start" },
  { title: "From", key: "from", align: "center" },
  { title: "To", key: "to", align: "center" },
  { title: "Notes", key: "notes", align: "start" },
  { title: "Status", key: "status", align: "center", sortable: false },
  { title: "Detail", key: "detail", align: "center", sortable: false },
]);

const chipColor = (x) => {
  if (x == "Approved") {
    return "green";
  } else if (x == "Pending") {
    return "yellow";
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
    from: new Date().toLocaleDateString(),
    to: new Date().toLocaleDateString(),
    notes: "",
    status: "",
  };
};

const test = () => {
  console.log(timeRequest.value);
};
</script>
