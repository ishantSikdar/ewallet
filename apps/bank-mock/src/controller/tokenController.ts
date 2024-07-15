import { Request, Response } from 'express';
import { v1 as uuidv1 } from 'uuid';

export const generateToken = (req: Request, res: Response) => {
    const token = uuidv1();
    console.log("Token generated");
    res.json({ token });
};
