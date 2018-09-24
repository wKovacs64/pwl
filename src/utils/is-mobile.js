import MobileDetect from 'mobile-detect';

export default userAgent => new MobileDetect(userAgent).mobile();
