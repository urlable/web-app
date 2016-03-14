import 'zone.js';
import 'reflect-metadata';
import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS
]);