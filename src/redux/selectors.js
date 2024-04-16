import { createSelector } from '@reduxjs/toolkit';

export const selectCampers = state => state.appState.campers;
export const selectCampersCount = state => state.appState.campersCount;
export const selectUsers = state => state.appState.users;
export const selectFilter = state => state.appState.filter;
export const selectIsLoading = state => state.appState.isLoading;
export const selectError = state => state.appState.error;
export const selectCurrentUser = state => state.appState.currentUser;
export const selectIsLoggedIn = state => state.appState.isLoggedIn;
// export const selectFilteredContacts = createSelector(
//   [selectContacts, selectCurrentUser, selectFilter],
//   (contacts, currentUser, filter) => {
//     return contacts.filter(contact => {
//       if (contact.owner === currentUser.id) {
//         const contactFullName = `${contact.firstName} ${contact.middleName} ${contact.lastName}`;
//         return contactFullName.toLowerCase().includes(filter.toLowerCase());
//       } else {
//         return null;
//       }
//     });
//   }
// );