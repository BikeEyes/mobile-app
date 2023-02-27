import { NavigationContext } from "@react-navigation/native";
import { useContext } from "react";

export const useNavigation = () => {
  const navigation = useContext(NavigationContext);
  return navigation;
};
