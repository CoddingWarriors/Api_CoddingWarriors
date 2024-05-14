import jwt from 'jsonwebtoken';

export class Authentication {
  public static readonly SECRET_KEY = 'secreto'; // Chave secreta para assinar o token

  static generateToken(id_usuario: string): string {
    return jwt.sign({ id_usuario }, this.SECRET_KEY, { expiresIn: '1h' });
  }

  static getUserIdFromToken(token: string): string | null {
    try {
      const decoded: any = jwt.verify(token, this.SECRET_KEY);
      return decoded.id_usuario;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  static isValidToken(token: string): boolean {
    try {
      jwt.verify(token, this.SECRET_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }
}
