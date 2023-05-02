import { Divider } from "react-native-paper";
import styled from "styled-components/native";
import { moderateScale, verticalScale } from "react-native-size-matters";

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  display: flex;
  margin-top: ${moderateScale(36)}px;
`;

export const Title = styled.Text`
  padding-top: ${verticalScale(36)}px;
  padding-left: ${moderateScale(36)}px;
  padding-bottom: ${verticalScale(36)}px;
  font-size: ${moderateScale(36)}px;
`;

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const SwitchText = styled.Text`
  font-size: ${moderateScale(14)}px;
`;

export const CustomDivider = styled(Divider)`
  margin: 10px 0;
`;
