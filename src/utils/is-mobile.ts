import MobileDetect from 'mobile-detect';

export default (
  userAgent = typeof window !== 'undefined'
    ? window.navigator.userAgent
    : undefined,
) => (userAgent ? new MobileDetect(userAgent).mobile() : false);
