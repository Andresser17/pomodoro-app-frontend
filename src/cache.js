import { makeVar, InMemoryCache } from "@apollo/client";

export const selectedTaskVar = makeVar({
  taskId: "",
  completedPomodoro: false,
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
