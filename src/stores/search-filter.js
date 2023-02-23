import { ref } from "vue";
import { defineStore } from "pinia";

export const filterTable = defineStore("counter", () => {
  const input = ref("");
  const isEmpty = ref(false);
  const allItems = ref([]);
  const searchedList = ref([...allItems.value]);

  const searchUsers = () => {
    const filteredObject = [];
    allItems.value.filter((item) => {
      const values = Object.values(item)
        .toString()
        .replaceAll(",", " ")
        .toLowerCase();
      if (values.includes(input.value.toLowerCase())) {
        filteredObject.push(item);
      }
    });

    if (filteredObject.length === 0 && input.value === "") {
      searchedList.value = allItems.value;
      isEmpty.value = false;
    } else if (filteredObject.length === 0 && input.value !== "") {
      searchedList.value = filteredObject;
      isEmpty.value = true;
    } else {
      searchedList.value = filteredObject;
      isEmpty.value = false;
    }
    return searchedList.value;
  };
  return { input, searchUsers, allItems, isEmpty };
});
