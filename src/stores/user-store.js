import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const currentUserStore = defineStore("current-user", () => {
  const firstname = ref("Olatomide");
  const lastname = ref("Elijah");
  const gender = ref("Female");
  const email = ref("Female");
  const phone_number = ref("Female");
  const profile_picture = ref(
    "https://xsgames.co/randomusers/avatar.php?g=male"
  );
  const name = computed(() => firstname.value + " " + lastname.value);
  return {
    email,
    name,
    firstname,
    lastname,
    profile_picture,
    gender,
    phone_number,
  };
});
