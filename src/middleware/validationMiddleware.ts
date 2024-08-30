import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

type Schema = Joi.ObjectSchema<any>;

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
    } else {
      next();
    }
  };
};

