import { useMemo } from "react";

import MainNavigator from "./Main";

const useNavigationScreens = () => {
  return useMemo(
    () => ({
      stack: [
        {
          name: "Main",
          component: MainNavigator,
        },
      ],
    }),
    []
  );
};

export default useNavigationScreens;
