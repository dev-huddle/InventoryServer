import bcrypt from 'bcryptjs';

// Encrypt data using bcrypt
export const encrypt = async (data: string) => {
  const salt = await bcrypt.genSalt(10);
  const encrypted = await bcrypt.hash(data, salt);
  return encrypted;
};

// Decrypt data (using bcrypt)
export const decrypt = async (data: string, hash: string) => {
  const isMatch = await bcrypt.compare(data, hash);
  return isMatch;
};
