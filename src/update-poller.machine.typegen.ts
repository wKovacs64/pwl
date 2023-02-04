
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.checkForUpdate": { type: "done.invoke.checkForUpdate"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.checkForUpdate": { type: "error.platform.checkForUpdate"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "checkForUpdate": "done.invoke.checkForUpdate";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "assignErrorMessage": "error.platform.checkForUpdate";
"assignUpdateAvailable": "done.invoke.checkForUpdate";
"reset": "CHECK_FOR_UPDATE" | "done.invoke.checkForUpdate" | "error.platform.checkForUpdate";
        };
        eventsCausingDelays: {

        };
        eventsCausingGuards: {
          "updateAvailable": "";
"updateNotAvailable": "";
        };
        eventsCausingServices: {
          "checkForUpdate": "CHECK_FOR_UPDATE";
        };
        matchesStates: "checkingForUpdate" | "failure" | "idle" | "success" | "updateAvailable";
        tags: never;
      }
