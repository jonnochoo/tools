export const usePasswordGenerator = () => {
  const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
  const NUMBERS = '0123456789'
  const SYMBOLS = '!@#$%^&*()-_=+[]{}|;:,.<>?'

  const generatePassword = (length: number): string => {
    const allChars = UPPERCASE + LOWERCASE + NUMBERS + SYMBOLS

    // Ensure at least one character from each required type
    const passwordArray = [
      UPPERCASE.charAt(Math.floor(Math.random() * UPPERCASE.length)),
      LOWERCASE.charAt(Math.floor(Math.random() * LOWERCASE.length)),
      NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length)),
      SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length)),
    ]

    // Fill the rest with random characters from all types
    for (let i = passwordArray.length; i < length; i++) {
      passwordArray.push(allChars.charAt(Math.floor(Math.random() * allChars.length)))
    }

    // Shuffle the array to randomize positions
    for (let i = passwordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]]
    }

    return passwordArray.join('')
  }

  return {
    generatePassword,
  }
}
