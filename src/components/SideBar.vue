
<template>
   <v-navigation-drawer
        color="#46494C"
        permanent
      >
       <v-list>
          <v-list-item
            title="Company Name"
          ></v-list-item>
       </v-list>
       <v-list density="compact" nav>
            <v-list-item prepend-icon="mdi-home" title="Home" value="homepage"></v-list-item>
            <v-list-item prepend-icon="mdi-currency-usd" title="Pay" value="paypage"></v-list-item>
            <v-list-item prepend-icon="mdi-account-check" title="Attendance" value="attendpage"></v-list-item>
            <v-list-item prepend-icon="mdi-clock-time-four" title="Time Off" value="timeoffpage"></v-list-item>
            <v-list-item prepend-icon="mdi-format-list-bulleted" title="Training" value="trainingpage"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group" title="Employees" value="employeepage"></v-list-item>
       </v-list>
    </v-navigation-drawer>
</template>

