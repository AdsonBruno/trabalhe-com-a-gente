import { Validator } from '../../presentation/protocols/Validator';
import { z, ZodError } from 'zod';
import { ValidationError } from '../../presentation/errors/ValidationError';

export class ZodValidatorAdapter implements Validator {
  constructor(private readonly schema: z.ZodType) {}

  validate(input: any): any {
    try {
      return this.schema.parse(input);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(JSON.stringify(z.flattenError(error)));
      }

      throw error;
    }
  }
}
