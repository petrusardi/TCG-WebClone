import bcrypt from 'bcryptjs';

export const hashPass = (plainPassword:string) => {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(8));
  };

export const comparePassword = (password: string, hashedPassword: string) => {
    return bcrypt.compareSync(password, hashedPassword)
  }