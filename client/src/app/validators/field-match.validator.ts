import { ValidatorFn, AbstractControl } from '@angular/forms';

export function fieldMatchValidator(ctrlName: string): ValidatorFn {
  return (control: AbstractControl): {[ key: string]: any } | null => {
    const ctrl = control.root ? control.root.get(ctrlName) : undefined;
    return ctrl && ctrl.value === control.value ? null : {
      fieldMismatch: {
        required: ctrl ? ctrl.value : undefined,
        actual: control.value
      }
    };
  };
}
