import jwt from 'jsonwebtoken';

export class Authentication {
  private static readonly SECRET_KEY = 'secreto'; // Chave secreta para assinar o token

  static generateToken(username: string): string {
    return jwt.sign({ username }, this.SECRET_KEY, { expiresIn: '5m' });
  }
}

