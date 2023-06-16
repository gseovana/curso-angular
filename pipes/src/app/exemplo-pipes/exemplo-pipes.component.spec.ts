import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploPipesComponent } from './exemplo-pipes.component';

describe('ExemploPipesComponent', () => {
  let component: ExemploPipesComponent;
  let fixture: ComponentFixture<ExemploPipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExemploPipesComponent]
    });
    fixture = TestBed.createComponent(ExemploPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
