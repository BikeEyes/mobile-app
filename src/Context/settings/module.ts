export interface SettingsContextProps {
  autoConnect: boolean;
  enableSounds: boolean;
}

export const defaultSettings: SettingsContextProps = {
  autoConnect: true,
  enableSounds: true,
};
