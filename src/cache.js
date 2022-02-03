import { makeVar, InMemoryCache } from "@apollo/client";

export const selectedTaskVar = makeVar({
  id: "",
  addCompletedPomodoro: undefined,
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        selectedTask: {
          read() {
            return selectedTaskVar();
          },
        },
      },
    },
  },
});
