import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function pwdMinSmallLettersValidator(count: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const letters = value ? value.match(/[a-z]/g) : undefined;
    return letters && letters.length >= count ? null : {
      minSmallLetters: {
        requiredLength: count,
        actualLength: letters ? letters.length : 0
      }
    };
  };
}
