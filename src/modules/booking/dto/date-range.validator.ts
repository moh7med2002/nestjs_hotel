import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsDateRangeValid implements ValidatorConstraintInterface {
  validate(value: Date, args: ValidationArguments) {
    const endDate = args.object[args.property];
    return value < endDate;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} should be less than ${args.constraints[0]}`;
  }
}
