import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterUsuarioComponent } from './footer-usuario.component';

describe('FooterUsuarioComponent', () => {
  let component: FooterUsuarioComponent;
  let fixture: ComponentFixture<FooterUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
