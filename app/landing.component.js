import {Component,Inject} from 'angular2/core';
import {Http,Headers,HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Component({
    selector: 'landing',
    providers: [HTTP_PROVIDERS],
    template: `
    <div class="container">
        <div>
            <div class="form-group">
                <label for="shortUrlTarget">url to shorten</label>
                <input type="text" class="form-control" #target (keyup.enter)="createShortUrl(target.value)" target.value=''>
            </div>
            <button type="button" class="btn btn-default" (click)=createShortUrl(target.value)>Create Short Url</button>
        </div>
        <div *ngIf="shortUrlView.href">
        your short url: is {{shortUrlView.href}}
        <a [href]="shortUrlView.href">Click To Try it!</a>
        </div>

    </div>
    `
})
export class LandingComponent {

    _http:Http;

    shortUrlView={};

    constructor(http:Http) {

        this._http = http;

    }

    // Angular2 DI desugar'd
    static get parameters() {
        return [[Http]];
    }

    createShortUrl(target:string) {

        const headers = new Headers({'Content-Type': 'application/json'});

        this._http
            .post('http://api.urlable.com/short-urls', `"${target}"`, {headers: headers})
            .map(res => res.json())
            .subscribe(shortUrlView => {
                this.shortUrlView = shortUrlView;
                this.shortUrlView.href = `http://r.urlable.com/${shortUrlView.id}`;
                alert(`your short url is ${this.shortUrlView.href}`);
            });
    }
}