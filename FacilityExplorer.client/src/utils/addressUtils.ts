export const addressRegex = /^([\s\S]+?), ([\s\S]+?), ([A-Za-z]{2}) (\d{5})$/;

export const formatAddress = (value: string): string => {
  const matches = value.match(addressRegex);
  return matches
    ? `${matches[1]}, ${matches[2]}, ${matches[3]} ${matches[4]}`
    : value;
};

// Street, City, State Zip
// example: 123rd PL NW, Coolville, TX 11963
