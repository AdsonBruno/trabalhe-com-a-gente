import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryDetailComponent } from './repository-detail.component';

describe('RepositoryDetail', () => {
  let component: RepositoryDetailComponent;
  let fixture: ComponentFixture<RepositoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
