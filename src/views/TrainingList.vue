<template>
  <v-app-bar color="#C5C3C6" flat height="64">
    <p color="#C5C3C6" class="text-h6 font-weight-bold pl-8">Training List</p>
    <v-spacer></v-spacer>
    <v-avatar size="32"> </v-avatar>
    <v-btn :icon="mdiLogout"> </v-btn>
  </v-app-bar>

  <v-row>
    <v-col cols="3">
      <v-card-text>
        <v-text-field
          v-model="search"
          :loading="loading"
          :append-inner-icon="mdiMagnify"
          density="compact"
          label="Search Employees"
          variant="solo"
          hide-details
          single-line
          flat
          @click:append-inner="onClick"
        >
        </v-text-field>
      </v-card-text>
    </v-col>

    <v-spacer />
    <v-col class="d-flex align-center justify-end pr-7">
      <v-btn flat color="#1985A1" @click="openNew()"
        >Add New Training</v-btn
      ></v-col
    >
  </v-row>

  <v-card max-height="750" class="ma-4 mt-0" color="#FFFFFF">
    <v-data-table
      :items="training"
      :headers="headers"
      hide-default-footer
      class="px-4"
      height="800"
      items-per-page="-1"
    >
      <template v-slot:item.date="{ value }">
        {{ value.toLocaleDateString() }}
      </template>

      <template v-slot:item.duration="{ value }">
        {{ value }} minutes
      </template>

      <template v-slot:item.edit="{ item }">
        <v-tooltip text="Edit Training">
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              flat
              v-bind="props"
              size="sm"
              @click="openEdit(training.indexOf(item))"
            >
              <v-icon :icon="mdiPencil" color="#1985A1" />
            </v-btn>
          </template>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>

  <v-dialog v-model="trainingDialog" width="auto" persistent>
    <v-form @submit.prevent="submit" v-model="isValid">
      <v-card width="800" :title="isNew ? 'Add New Training' : 'Edit Training'">
        <template v-slot:append>
          <v-btn :icon="mdiClose" flat size="sm" @click="closeDialog"></v-btn>
        </template>

        <v-card-text class="pa-4 pt-2">
          <v-row>
            <v-col cols="12" class="pb-1">
              <v-text-field
                label="Training Name"
                v-model="trainingForm.name"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('You have to fill this field')]"
              ></v-text-field>
            </v-col>
            <v-col cols="8" class="pt-1 pb-1">
              <v-date-input
                v-model="trainingForm.date"
                label="Date"
                variant="outlined"
                density="compact"
                prepend-icon=""
                :prepend-inner-icon="mdiCalendar"
                :min="new Date().toLocaleDateString()"
                :rules="[rules.required('You have to fill this field')]"
              ></v-date-input>
            </v-col>
            <v-col cols="4" class="pt-1 pb-1">
              <v-text-field
                label="Duration"
                v-model="trainingForm.duration"
                variant="outlined"
                density="compact"
                width="auto"
                type="number"
                :rules="[rules.required('You have to fill this field'), noZero]"
              >
                <template v-slot:append-inner> Minutes </template>
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pt-1 pb-1">
              <v-text-field
                label="Trainer"
                v-model="trainingForm.trainer"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('You have to fill this field')]"
              ></v-text-field>
            </v-col>
            <v-col cols="6" class="pt-1 pb-1">
              <v-select
                label="Training Type"
                v-model="trainingForm.type"
                variant="outlined"
                density="compact"
                :items="['Online', 'Offline']"
                width="auto"
                :rules="[rules.required('You have to fill this field')]"
              ></v-select>
            </v-col>
            <v-col cols="12" class="pt-1 pb-1">
              <v-select
                label="Division"
                v-model="trainingForm.division"
                variant="outlined"
                density="compact"
                :items="[
                  'Marketing',
                  'Human Resource',
                  'IT Developer',
                  'Design',
                ]"
                width="auto"
                :rules="[rules.required('You have to fill this field')]"
              ></v-select>
            </v-col>
            <v-col cols="12" class="pt-1 pb-1">
              <v-text-field
                label="Training Link"
                v-model="trainingForm.link"
                variant="outlined"
                density="compact"
                width="auto"
                :rules="[rules.required('You have to fill this field'), url]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn
            type="submit"
            :text="isNew ? 'Submit' : 'Save'"
            color="#1985A1"
            variant="flat"
          />
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import {
  mdiCalendar,
  mdiClose,
  mdiLogout,
  mdiMagnify,
  mdiPencil,
} from "@mdi/js";
import { VDateInput } from "vuetify/labs/VDateInput";
import { ref, reactive } from "vue";
import { useRules } from "vuetify/labs/rules";

const rules = useRules();

const trainingDialog = ref(false);
const isNew = ref(false);
const isEdit = ref(false);
const isValid = ref(false);

const noZero = (x) => {
  if (x == 0) {
    return "Duration Cannot Be Zero";
  }
};

const url = (x) => {
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}/gm;
  return regex.test(x) || "Must be a valid URL";
};

const training = ref([
  {
    name: "Building Safety",
    date: new Date(),
    duration: 90,
    trainer: "John K.",
    type: "Online",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley",
    division: "Human Resource",
  },
]);

const trainingForm = reactive({
  name: "",
  date: new Date(),
  duration: 0,
  trainer: "",
  type: "Online",
  link: "",
  division: null,
});

const headers = [
  { title: "Training Name", value: "name", align: "start", sortable: true },
  { title: "Date", value: "date", align: "center", sortable: true },
  { title: "Duration", value: "duration", align: "center", sortable: true },
  { title: "Trainer", value: "trainer", align: "center", sortable: true },
  { title: "Type", value: "type", align: "center", sortable: true },
  { title: "Division", value: "division", align: "center", sortable: true },
  { title: "Edit", value: "edit", align: "center", sortable: false },
];

const openNew = () => {
  isNew.value = true;
  trainingForm.name = "";
  trainingForm.date = new Date();
  trainingForm.duration = 0;
  trainingForm.trainer = "";
  trainingForm.type = "Online";
  trainingForm.link = "";
  trainingForm.division = null;
  trainingDialog.value = true;
};

const openEdit = (x) => {
  isEdit.value = false;
  trainingForm.name = training.value[x].name;
  trainingForm.date = training.value[x].date;
  trainingForm.duration = training.value[x].duration;
  trainingForm.trainer = training.value[x].trainer;
  trainingForm.type = training.value[x].type;
  trainingForm.link = training.value[x].link;
  trainingForm.division = training.value[x].division;
  trainingDialog.value = true;
};

const closeDialog = () => {
  isNew.value = false;
  isEdit.value = false;
  trainingForm.name = "";
  trainingForm.date = new Date();
  trainingForm.duration = 0;
  trainingForm.trainer = "";
  trainingForm.type = "Online";
  trainingForm.link = "";
  trainingForm.division = null;
  trainingDialog.value = false;
};

const submit = () => {
  if (isValid.value) {
    if(isNew.value){
      // masukin logic buat insert data baru ke tabel sini
    }
    if(isEdit.value) {
      // masukin logic buat update data yang di edit di sini
    }
    closeDialog();
  }
};
</script>
