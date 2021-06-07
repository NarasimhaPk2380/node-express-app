import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FlexCardsLayoutModule } from '@buyonline/shared/ui/flex-cards-layout';
import { MyCollectionLayoutComponent } from './my-collection-layout.component';

class RouterStub {
  url = '';
  navigate(commands: any[], extras?: any) {}
}

describe('MyCollectionLayoutComponent', () => {
  let component: MyCollectionLayoutComponent;
  let fixture: ComponentFixture<MyCollectionLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCollectionLayoutComponent],
      imports: [FlexCardsLayoutModule],
      providers: [{ provide: Router, useClass: RouterStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCollectionLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke updateCollectionItems()', () => {
    spyOn(component, 'updateCollectionItems').and.callThrough();
    component.updateCollectionItems();
    expect(component.updateCollectionItems).toHaveBeenCalled();
  });
});
