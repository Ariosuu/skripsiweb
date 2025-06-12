import { ref } from "vue";
import { db } from "../firebase/config";
import { projectAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const user = ref(projectAuth.currentUser);

onAuthStateChanged(projectAuth, (_user) => {
  console.log("User state changed:", _user);
  const uid = user.uid;

  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
