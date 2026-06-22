import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isURL,
  registerDecorator,
} from 'class-validator';

/**
 * Acepta URLs HTTP/HTTPS o rutas locales absolutas (para juegos embebidos en la SPA).
 */
@ValidatorConstraint({ async: false })
class IsGameUrlConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    if (typeof value !== 'string') {
      return false;
    }
    if (value.startsWith('/')) {
      return value.length > 1 && !value.includes('//');
    }
    return isURL(value, { require_tld: false });
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a valid HTTP(S) URL or an absolute local path`;
  }
}

export function IsGameUrl(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGameUrlConstraint,
    });
  };
}
