import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function pwdMinCapLettersValidator(count: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const letters = value ? value.match(/[A-Z]/g) : undefined;
    return letters && letters.length >= count ? null : {
      minCapLetters: {
        requiredLength: count,
        actualLength: letters ? letters.length : 0
      }
    };
  };
}
