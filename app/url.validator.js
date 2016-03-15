import {Directive, provide} from 'angular2/core';
import {NG_VALIDATORS} from 'angular2/common';
import validator from 'validator';

function validateUrl(c:Control) {
    return c.value&&validator.isURL(c.value) ? null : {
        validateUrl: {
            valid: false
        }
    };
}

// see http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
@Directive({
    selector: '[validateUrl][ngControl],[validateUrl][ngModel],[validateUrl][ngFormControl]',
    providers: [
        provide(NG_VALIDATORS, {
            useValue: validateUrl,
            multi: true
        })
    ]
})
export class UrlValidator {
}
