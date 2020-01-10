import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function pwdMinNumbersValidator(count: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const numbers = value ? value.match(/[0-9]/g) : undefined;
    return numbers && numbers.length >= count ? null : {
      'minNumbers': {
        requiredLength: count,
        actualLength: numbers ? numbers.length : 0
      }
    };
  };
}
