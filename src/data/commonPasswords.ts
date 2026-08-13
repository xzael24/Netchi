export const COMMON_PASSWORDS = [
  "123456", "password", "123456789", "12345678", "12345", "qwerty", "1234567",
  "111111", "123123", "abc123", "1234567890", "12345678910", "000000", "iloveyou",
  "1q2w3e4r", "aa123456", "password1", "qwerty123", "admin", "letmein", "welcome",
  "monkey", "dragon", "football", "baseball", "shadow", "master", "666666", "sunshine",
  "trustno1", "princess", "superman", "batman", "whatever", "access", "hello", "charlie",
  "donald", "michael", "freedom", "whatever", "qazwsx", "zaq12wsx", "asdfghjkl",
  "ashley", "bailey", "login", "passw0rd", "starwars", "pokemon", "naruto", "indonesia",
];

export function isCommonPassword(password: string): boolean {
  return COMMON_PASSWORDS.includes(password.toLowerCase());
}