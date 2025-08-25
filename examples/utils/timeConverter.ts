/**
 * Utility to convert seconds to a readable time format    
 * Similar to the format shown in the Wasapi frontend
 */

export interface TimeFormat {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
    * Converts seconds to an object with days, hours, minutes and seconds
 * @param totalSeconds - Total seconds to convert
 * @returns Object with the time decomposed in days, hours, minutes and seconds     
 */
export function secondsToTimeFormat(totalSeconds: number): TimeFormat {
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds
  };
}


/**
 * Converts seconds to a compact format (e.g: "20d 6h 44m")
 * @param totalSeconds - Total seconds to convert
 * @returns String formatted time
 */
export function secondsToCompactFormat(totalSeconds: number): string {
  const time = secondsToTimeFormat(totalSeconds);
  const parts: string[] = [];

  if (time.days > 0) {
    parts.push(`${time.days}d`);
  }
  
  if (time.hours > 0) {
    parts.push(`${time.hours}h`);
  }
  
  if (time.minutes > 0) {
    parts.push(`${time.minutes}m`);
  }
  
  if (time.seconds > 0 && parts.length === 0) {
    parts.push(`${time.seconds}s`);
  }

  return parts.join(' ');
}
