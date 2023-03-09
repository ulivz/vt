export const STATUS_HIDDEN_EVENT = "hidden-status";
export const STATUS_SETTING_KEY = "--status-setting--";
export const STATUS_CURRENT_VERSION_KEY = "--status-current-version--";
export const DEFAULT_VERSION = "v1";

export type StatusSetting = Record<string /* version */, boolean /* open */>;
const DEFAULT_SETTING: StatusSetting = {
  [DEFAULT_VERSION]: true,
};

export class Status {
  bootstrap() {
    const currentVersion = this.getCurrentVersion();
    if (!currentVersion) {
      this.setCurrentVersion(DEFAULT_VERSION);
    }
  }

  getCurrentVersion() {
    return localStorage.getItem(STATUS_CURRENT_VERSION_KEY);
  }

  setCurrentVersion(version: string) {
    return localStorage.setItem(STATUS_CURRENT_VERSION_KEY, version);
  }

  getSetting(): StatusSetting {
    try {
      const res = JSON.parse(localStorage.getItem(STATUS_SETTING_KEY));
      if (res === null) {
        return DEFAULT_SETTING;
      }
      return res;
    } catch (e) {
      return DEFAULT_SETTING;
    }
  }

  setSetting(setting: StatusSetting) {
    const currentSetting = this.getSetting();
    localStorage.setItem(
      STATUS_SETTING_KEY,
      JSON.stringify({
        ...currentSetting,
        ...setting,
      })
    );
  }

  isSettingEnabled() {
    const currentVersion = this.getCurrentVersion();
    const setting = this.getSetting();
    return setting[currentVersion] !== false;
  }

  closeCurrentStatus() {
    const currentVersion = this.getCurrentVersion();
    this.setSetting({
      [currentVersion]: false,
    });
  }
}

export const $status = new Status();
