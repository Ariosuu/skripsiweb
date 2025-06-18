<template>
  <v-card max-height="800" class="ma-4">
    <v-data-table
      :items="ReimList"
      :headers="headers"
      hide-default-footer
      class="px-4"
      height="800"
      items-per-page="-1"
    >
      <template v-slot:item.date="{ value }">
        {{ value }}
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
        <v-btn icon flat size="sm" @click="viewRequest(ReimList.indexOf(item))">
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
              <v-img
                :src="requestForm.receiptImage"
                max-width="390"
                max-height="390"
              ></v-img>
            </v-col>

            <v-col cols="6">
              <v-text-field
                label="Approve Amount"
                v-model="requestForm.approved"
                variant="outlined"
                density="compact"
                width="auto"
                type="number"
                :rules="[rules.required('You have to fill this field')]"
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
import {
  mdiCalendar,
  mdiClose,
  mdiEye,
  mdiLogout,
  mdiFilter,
  mdiUpload,
} from "@mdi/js";
import { reactive, ref, onMounted, computed, watch } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VFileUpload } from "vuetify/labs/VFileUpload";
import { useRules } from "vuetify/labs/rules";
import { db, projectAuth } from "@/firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const requestDialog = ref(false);
const rules = useRules();
const auth = getAuth();
const reimburseDialog = ref(false);
const isNew = ref(false);
const reqName = ref();
const reqPos = ref();
const allReim = ref([]);
const ReimList = ref([]);
const docRef = collection(db, "reimburse");
const isValid = ref(false);
const filterReim = ref("");

const unsubscribe = onSnapshot(docRef, (snapshot) => {
  let docs = [];
  snapshot.docs.forEach((doc) => {
    docs.push({ ...doc.data(), id: doc.id });
  });

  const formattedDocs = docs.map((item) => {
    const newItem = { ...item };
    if (newItem.date && newItem.date.toDate) {
      newItem.date = newItem.date.toDate().toLocaleDateString();
    }
    return newItem;
  });
  ReimList.value = formattedDocs.filter((item) => item.status === "Pending");
});

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

const requestForm = reactive({
  name: "",
  date: new Date(),
  bill: 0,
  approved: 0,
  status: "Pending",
  notes: "",
  receiptFile: null,
  receiptImage: null,
  _index: null,
});

const viewRequest = (x) => {
  requestForm.name = ReimList.value[x].name;
  requestForm.date = ReimList.value[x].date;
  requestForm.bill = ReimList.value[x].bill;
  requestForm.approved = ReimList.value[x].approved;
  requestForm.notes = ReimList.value[x].notes;
  requestForm.receiptFile = ReimList.value[x].receiptFile;
  requestForm.receiptImage = ReimList.value[x].detail;
  requestForm._index = x;
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

const decision = async (x) => {
  if (isValid.value) {
    const idx = requestForm._index;
    const docId = ReimList.value[idx]?.id;
    const docRef = doc(db, "reimburse", docId);
    if (docId) {
      let approvedAmount = requestForm.approved;
      if (typeof approvedAmount === "string") {
        approvedAmount = Number(approvedAmount);
      }
      if (x === "Approve") {
        await updateDoc(docRef, {
          approved: approvedAmount,
          status: "Approved",
        });
      }
    }
    if (x === "Reject") {
      await updateDoc(docRef, {
        approved: 0,
        status: "Rejected",
      });
    }
    closeDialog();
  }
};
</script>
