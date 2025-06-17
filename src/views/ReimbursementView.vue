<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Reimbursement</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-row>
    <v-col cols="4"> </v-col>
    <v-spacer />
    <v-col class="d-flex align-center justify-end pr-7 ma-4">
      <v-btn flat color="#1985A1" @click="newReimburse"
        >Add New Reimburse</v-btn
      ></v-col
    >
  </v-row>

  <v-card class="ma-4 mt-0" max-height="750">
    <v-card class="ma-4" color="#D9D9D9" flat>
      <v-card-title>Total Reimbursement</v-card-title>
      <v-card-text class="text-h3 font-weight-bold">{{
        total.toLocaleString("id-id", {
          style: "currency",
          currency: "IDR",
        })
      }}</v-card-text>
    </v-card>

    <v-data-table
      :headers="headers"
      :items="newReim"
      class="px-4"
      height="600"
      hide-default-footer
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
          @click="viewReimburse(newReim.indexOf(item))"
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
      <v-card width="1200" :title="isNew ? 'New Claim' : 'Claim Detail'">
        <template v-slot:append>
          <v-btn :icon="mdiClose" flat size="sm" @click="closeDialog"></v-btn>
        </template>

        <v-card-text class="pa-4 pt-2">
          <v-row>
            <v-col :cols="isNew ? 12 : 8">
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
                    :max="new Date().toLocaleDateString()"
                    :rules="[rules.required('You have to fill this field')]"
                    :readonly="!isNew"
                  ></v-date-input>
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    label="Amount"
                    v-model="reimburseForm.bill"
                    variant="outlined"
                    density="compact"
                    width="auto"
                    type="number"
                    :rules="[
                      rules.required('You have to fill this field'),
                      noZero,
                    ]"
                    :readonly="!isNew"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-1 pb-0" v-if="isNew">
                  <v-file-input
                    v-model="reimburseForm.receiptFile"
                    variant="outlined"
                    density="compact"
                    :rules="[rules.required('You have to add a receipt')]"
                    accept="image/*"
                    label="Receipt"
                  ></v-file-input>
                </v-col>
                <v-col cols="12" class="pt-1">
                  <v-textarea
                    label="Notes"
                    variant="outlined"
                    v-model="reimburseForm.notes"
                    hide-details
                    no-resize
                    rows="7"
                    :readonly="!isNew"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="4" v-if="!isNew">
              <v-img
                v-if="reimburseForm.receiptImage"
                :src="reimburseForm.receiptImage"
                alt="Receipt"
                max-width="390"
                max-height="390"
              ></v-img>
              <div v-else>No image uploaded.</div>
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
import {
  mdiFilter,
  mdiLogout,
  mdiEye,
  mdiClose,
  mdiCalendar,
  mdiUpload,
} from "@mdi/js";
import { onMounted, ref, computed, watch } from "vue";
import { VDateInput } from "vuetify/labs/VDateInput";
import { VFileUpload } from "vuetify/labs/VFileUpload";
import { useRules } from "vuetify/labs/rules";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { projectAuth } from "@/firebase/config";

const auth = getAuth();
const reimburseDialog = ref(false);
const isValid = ref(false);
const isNew = ref(false);
const total = computed(() =>
  newReim.value.reduce((sum, item) => sum + (Number(item.bill) || 0), 0)
);
const rules = useRules();
const reqName = ref();
const reqPos = ref();
const allReim = ref([]);
const newReim = ref([]);
const docRef = collection(db, "reimburse");

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
  allReim.value = formattedDocs;
});

// Watch reqName and filter reimbursements for the current user
watch(
  () => reqName.value,
  (name) => {
    if (name) {
      newReim.value = allReim.value.filter((item) => item.name === name);
    }
  },
  { immediate: true }
);

// Also watch allReim in case data arrives after reqName
watch(
  allReim,
  (docs) => {
    if (reqName.value) {
      newReim.value = docs.filter((item) => item.name === reqName.value);
    }
  },
  { immediate: true }
);

const reimburseForm = ref({
  name: reqName,
  date: new Date(),
  bill: 0,
  approved: 0,
  status: "Pending",
  notes: "",
  receiptFile: null,
  receiptImage: null,
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    getDocs(collection(db, "employees")).then((snapshot) => {
      let docs = [];
      snapshot.docs.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      const currentUser = docs.find(
        (doc) => doc.uid === user.uid || doc.email === user.email
      );
      if (currentUser) {
        reqName.value = currentUser.firstName + " " + currentUser.lastName;
        reqPos.value = currentUser.jobTitle;
      }
    });
  }
});
const headers = ref([
  { title: "Claim Date", key: "date", align: "start" },
  { title: "Total Bill", key: "bill", align: "start" },
  { title: "Approved Amount", key: "approved", align: "start" },
  { title: "Status", key: "status", align: "center", sortable: false },
  { title: "Detail", key: "detail", align: "center", sortable: false },
]);

const noZero = (x) => {
  if (x == 0) {
    return "Amount Cannot Be Zero";
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

const createBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

const createImage = (file) => {
  const url = URL.createObjectURL(file);
  return url;
};

const newReimburse = () => {
  isNew.value = true;
  reimburseDialog.value = true;
};

const viewReimburse = (x) => {
  isNew.value = false;
  reimburseForm.value = { ...newReim.value[x] };
  reimburseForm.value.receiptImage = newReim.value[x].detail;
  console.log(reimburseForm.value);
  reimburseDialog.value = true;
};

const closeDialog = () => {
  reimburseForm.value = {
    name: reqName,
    date: new Date(),
    bill: 0,
    approved: 0,
    status: "Pending",
    notes: "",
  };
  reimburseDialog.value = false;
};

const test = async () => {
  if (isValid.value) {
    reimburseForm.value.bill = Number(reimburseForm.value.bill);
    let imageData = null;
    if (reimburseForm.value.receiptFile) {
      imageData = await createBase64(reimburseForm.value.receiptFile);
    }
    await addDoc(collection(db, "reimburse"), {
      date: reimburseForm.value.date,
      name: reqName.value,
      bill: reimburseForm.value.bill,
      approved: 0,
      notes: reimburseForm.value.notes,
      status: "Pending",
      detail: imageData,
    });
  }
  closeDialog();
};
</script>
