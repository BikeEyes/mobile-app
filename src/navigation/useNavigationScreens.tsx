import { useMemo } from "react";

import { Routes } from "./routes";
import MainNavigator from "./Main";

const useNavigationScreens = () => {
  return useMemo(
    () => ({
      stack: [
        {
          name: Routes.MAIN,
          component: MainNavigator,
        },
      ],
    }),
    []
  );
};

export default useNavigationScreens;
