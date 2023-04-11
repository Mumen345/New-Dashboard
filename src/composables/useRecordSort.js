export default () => {

   let sortAsc = (a, b, key) => {
      if (a[key] < b[key]) {
         return -1;
      }
      if (a[key] > b[key]) {
         return 1;
      }
      return 0;
   }

   let sortDesc = (a, b, key) => {
      if (a[key] > b[key]) {
         return -1;
      }
      if (a[key] < b[key]) {
         return 1;
      }
      return 0;
   }
   return { 
      sortAsc, sortDesc
   }
}
