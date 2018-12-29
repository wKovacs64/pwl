import MobileDetect from 'mobile-detect';

export default (
  userAgent: string | undefined = typeof window !== 'undefined'
    ? window.navigator.userAgent
    : undefined,
): boolean =>
  userAgent ? Boolean(new MobileDetect(userAgent).mobile()) : false;
