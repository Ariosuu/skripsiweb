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
              <v-btn color="#1985A1" flat @click="leaveRequest = true">
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
            <template v-slot:item.detail>
              <v-btn icon flat size="sm">
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

  <v-dialog v-model="leaveRequest" width="auto">
    <v-card width="700">
      <v-card-title>Employee Leave Request Form</v-card-title>
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
              ></v-autocomplete>
            </v-col>

            <v-col cols="4">
              <v-text-field
                label="From"
                v-model="request.from"
                variant="outlined"
                density="compact"
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="To"
                v-model="request.to"
                variant="outlined"
                density="compact"
                hide-details
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                label="Reason"
                variant="outlined"
                v-model="request.reason"
                hide-details
              ></v-textarea>
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
import { mdiEye, mdiLogout } from "@mdi/js";
import { ref, reactive } from "vue";

const leaveRequest = ref(false);
const timeRequest = ref([
  {
    type: "Diddy Do It",
    from: "18/02/2025",
    to: "18/02/2025",
    notes: "Baby Powder",
    status: "Approved",
  },
]);

const request = ref({
  name: "Daniel Garyo",
  position: "Employee",
  type: "Sick",
  reason: "",
  from: "",
  to: "",
});

const leaveType = ["Sick", "Family", "Maternity"];

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

const test = () => {
  console.log(request.value);
};
</script>
