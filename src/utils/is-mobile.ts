import MobileDetect from 'mobile-detect';

export const isMobile = (
  userAgent = typeof window !== 'undefined'
    ? window.navigator.userAgent
    : undefined,
): boolean =>
  userAgent ? Boolean(new MobileDetect(userAgent).mobile()) : false;
