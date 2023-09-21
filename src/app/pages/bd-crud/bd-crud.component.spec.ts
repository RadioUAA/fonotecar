import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdCrudComponent } from './bd-crud.component';

describe('BdCrudComponent', () => {
  let component: BdCrudComponent;
  let fixture: ComponentFixture<BdCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
