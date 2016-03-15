import {Component,Inject} from 'angular2/core';
import {Http,Headers,HTTP_PROVIDERS} from 'angular2/http';
import {UrlValidator} from './url.validator';
import 'rxjs/Rx';

@Component({
    selector: 'landing',
    providers: [HTTP_PROVIDERS],
    directives: [UrlValidator],
    template: `
    <div class="container">
        <div *ngIf="shortUrlView.href">
            <div class="alert alert-success" role="alert">
                Success! Your short url is <code>{{shortUrlView.href}}</code>
                <a [href]="shortUrlView.href" class="alert-link">Try it!</a>
            </div>
        </div>
        <div *ngIf="!shortUrlView.href">
            <br>
            <br>
        </div>
        <form #createShortUrlForm="ngForm">
            <div class="input-group input-group-lg">
                <input type="url" class="form-control input-lg" [(ngModel)]="createShortUrlReqTarget" required validateUrl ngControl="target" placeholder="enter a url...">
                <span class="input-group-btn">
                    <button class="btn btn-default" type="button" [disabled]="!createShortUrlForm.form.valid" (click)=createShortUrl()>Shorten!</button>
                </span>
            </div>
        </form>
    </div>
    `
})
export class LandingComponent {

    _http:Http;

    createShortUrlReqTarget;

    shortUrlView = {};

    constructor(http:Http) {

        this._http = http;

    }

    // Angular2 DI desugar'd
    static get parameters() {
        return [[Http]];
    }

    createShortUrl() {

        const headers = new Headers({'Content-Type': 'application/json'});

        this._http
            .post('http://api.urlable.com/short-urls', `"${this.createShortUrlReqTarget}"`, {headers: headers})
            .map(res => res.json())
            .subscribe(shortUrlView => {
                this.shortUrlView = shortUrlView;
                this.shortUrlView.href = `http://r.urlable.com/${shortUrlView.id}`;
            });
    }
}