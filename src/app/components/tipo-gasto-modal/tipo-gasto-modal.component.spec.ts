import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoGastoModalComponent } from './tipo-gasto-modal.component';

describe('TipoGastoModalComponent', () => {
  let component: TipoGastoModalComponent;
  let fixture: ComponentFixture<TipoGastoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoGastoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoGastoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
