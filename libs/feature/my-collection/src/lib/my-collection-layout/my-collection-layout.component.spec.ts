import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCollectionLayoutComponent } from './my-collection-layout.component';

describe('MyCollectionLayoutComponent', () => {
  let component: MyCollectionLayoutComponent;
  let fixture: ComponentFixture<MyCollectionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCollectionLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
