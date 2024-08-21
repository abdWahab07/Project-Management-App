import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounementPannelComponent } from './announement-pannel.component';

describe('AnnounementPannelComponent', () => {
  let component: AnnounementPannelComponent;
  let fixture: ComponentFixture<AnnounementPannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnounementPannelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnounementPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
