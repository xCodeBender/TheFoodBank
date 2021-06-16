/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ConfirmationComponent } from './confirmation.component';

let component: ConfirmationComponent;
let fixture: ComponentFixture<ConfirmationComponent>;

describe('confirmation component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ConfirmationComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ConfirmationComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});