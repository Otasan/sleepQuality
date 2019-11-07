import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushBluetoothPage } from './push-bluetooth.page';

describe('PushBluetoothPage', () => {
  let component: PushBluetoothPage;
  let fixture: ComponentFixture<PushBluetoothPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushBluetoothPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushBluetoothPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
