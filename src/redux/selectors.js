import { createSelector } from "@reduxjs/toolkit";

export const selectCampers = (state) => state.appState.campers;
export const selectUsers = (state) => state.appState.users;
export const selectFilter = (state) => state.appState.filter;
export const selectIsLoading = (state) => state.appState.isLoading;
export const selectError = (state) => state.appState.error;
export const selectCurrentUser = (state) => state.appState.currentUser;
export const selectIsLoggedIn = (state) => state.appState.isLoggedIn;
export const selectFilteredCampers = createSelector(
  [selectCampers, selectFilter],
  (campers, filter) => {
    return campers
      .filter((camper) =>
        filter.location?.length > 0
          ? camper.location.toLowerCase().trim().includes(filter.location)
          : true
      )
      .filter((camper) =>
        filter.transmission?.length > 0
          ? camper.transmission === filter.transmission
          : true
      )
      .filter((camper) =>
        filter.form?.length > 0 ? camper.form === filter.form : true
      )
      .filter((camper) =>
        filter.equipment?.length > 0
          ? filter.equipment.every((item) => camper.details[item] > 0)
          : true
      );
  }
);

// function getCampersByParams() {
//   if (filter[option].length > 0 && filter[option] !== "page") {
//     switch (option) {
//       case "location":
//         return camper.location.toLowerCase().trim().includes(filter.location);

//       case "transmission":
//         return camper.transmission === filter.transmission;

//       case "form":
//         return camper.form === filter.form;

//       case "equipment":
//         return filter.equipment.map((item) => camper[item] > 0).length ===
//           filter.equipment.length
//           ? true
//           : false;

//       default:
//         return;
//     }
//   } else {
//     return true;
//   }
// }
