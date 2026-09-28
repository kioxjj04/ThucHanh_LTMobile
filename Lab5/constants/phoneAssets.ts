export const PHONE_IMAGES: Record<string, any> = {
  silver: require('../assets/images/phone_silver.png'),
  red: require('../assets/images/phone_red.png'),
  black: require('../assets/images/phone_black.png'),
  blue: require('../assets/images/phone_blue.png'),
};

export function getPhoneImage(key?: string) {
  if (key && PHONE_IMAGES[key]) {
    return PHONE_IMAGES[key];
  }
  return PHONE_IMAGES.blue;
}
