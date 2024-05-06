import jwt from 'jsonwebtoken';

export class Authentication {
  public static readonly SECRET_KEY = 'secreto'; // Chave secreta para assinar o token

  static generateToken(id_usuario: string): string {
    return jwt.sign({ id_usuario }, this.SECRET_KEY, { expiresIn: '1h' });
  }
}

