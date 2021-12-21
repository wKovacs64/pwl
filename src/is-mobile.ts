import MobileDetect from 'mobile-detect';

export function isMobile(
  userAgent: string | undefined = typeof window !== 'undefined'
    ? window.navigator.userAgent
    : undefined,
): boolean {
  return userAgent ? Boolean(new MobileDetect(userAgent).mobile()) : false;
}
