declare global {
  namespace Express {
    interface Request {
      userId: {
        id: string;
      };
      user: {
        id: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

export default global;
