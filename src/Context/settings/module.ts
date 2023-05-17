export interface SettingsContextProps {
  autoConnect: boolean;
  enableSounds: boolean;
  enableMeasurements: boolean;
}

export const defaultSettings: SettingsContextProps = {
  autoConnect: true,
  enableSounds: true,
  enableMeasurements: false,
};
