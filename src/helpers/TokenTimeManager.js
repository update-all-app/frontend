export default class TokenTimeManager {
  static getEpochExpiryTime(expiresIn) {
    const now = new Date();
    const expiresAt = now.getTime() + expiresIn * 1000;
    return expiresAt;
  }

  constructor(expiresAt) {
    this.expiresAtDate = new Date(Number.parseInt(expiresAt));
  }

  tokenIsExpired() {
    const now = new Date();
    return now >= this.expiresAtDate;
  }
}
