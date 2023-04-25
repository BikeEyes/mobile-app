export interface RadarContextProps {
  relativeSpeed: number; // m/s
  distance: number; // m
}

export const RCDefaultState: RadarContextProps = {
  relativeSpeed: 0,
  distance: 0,
};
