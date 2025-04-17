export class DateTimeUtil {
  static format(): string {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB'); // → 17/04/2025
    const time = now
      .toLocaleTimeString('en-GB', { hour12: false }) // → 17:25:56
      .replace(/:/g, '.'); // → 17.25.56

    return `${date}, ${time}`;
  }

  static nowIso(): string {
    return new Date().toISOString();
  }

}
