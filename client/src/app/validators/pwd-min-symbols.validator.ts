import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function pwdMinSymbolsValidator(count: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    const symbols = value ? value.match(/[\s\\\/\[\]\-(){}<>!@#§$%^&*_+~=;':"|,.?]/g) : undefined;
    return symbols && symbols.length >= count ? null : {
      minSymbols: {
        requiredLength: count,
        actualLength: symbols ? symbols.length : 0
      }
    };
  };
}
