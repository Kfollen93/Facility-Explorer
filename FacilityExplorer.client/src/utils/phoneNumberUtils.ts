export const phoneNumberRegex = /^\D*?(\d{3})\D*?(\d{3})\D*?(\d{4})\D*?$/; // (xxx) xxx-xxxx

export const formatPhoneNumber = (value: string): string => {
  const matches = value.match(phoneNumberRegex);
  return matches ? `(${matches[1]}) ${matches[2]}-${matches[3]}` : value;
};
