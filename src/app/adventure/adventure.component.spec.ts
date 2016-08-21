/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { AdventureComponent } from './adventure.component';

describe('Component: Adventure', () => {
  it('should create an instance', () => {
    let component = new AdventureComponent();
    expect(component).toBeTruthy();
  });
});
