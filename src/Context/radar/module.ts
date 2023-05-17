export interface RadarProps {
  relativeSpeed: number; // m/s
  distance: number; // m
}

export type RadarContextProps = RadarProps & { history?: RadarProps[] };

export const RCDefaultState: RadarContextProps = {
  relativeSpeed: 0,
  distance: 0,
  history: [],
};
