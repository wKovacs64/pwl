
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.pwnedPassword": { type: "done.invoke.pwnedPassword"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.pwnedPassword": { type: "error.platform.pwnedPassword"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "getNumPwns": "done.invoke.pwnedPassword";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "assignError": "error.platform.pwnedPassword";
"assignNumPwns": "done.invoke.pwnedPassword";
"reset": "GET_PWNED_INFO" | "done.invoke.pwnedPassword" | "error.platform.pwnedPassword";
        };
        eventsCausingDelays: {

        };
        eventsCausingGuards: {

        };
        eventsCausingServices: {
          "getNumPwns": "GET_PWNED_INFO";
        };
        matchesStates: "failure" | "gettingNumPwns" | "idle" | "success";
        tags: never;
      }
