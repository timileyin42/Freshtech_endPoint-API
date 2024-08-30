import Joi from 'joi';

export const airtimeToCashSchema = Joi.object({
  amount: Joi.number().positive().required()
});

