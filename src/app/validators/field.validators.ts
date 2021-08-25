import { AbstractControl, ValidationErrors } from "@angular/forms";

export class FieldValidators {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(" ") >= 0) {
            return { cannotContainSpace: true }
        }
        return null
    }

    static ShouldBeUniqueField(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'obed') {
                    resolve({ ShouldBeUniqueField: true })
                } else {
                    resolve(null)
                }
            }, 2000);
        })
    }
}