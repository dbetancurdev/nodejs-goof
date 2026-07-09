import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PasswordComponent } from './password.component';
import { PasswordService } from './password.service';

describe('PasswordComponent', () => {
  let comp: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  let service: PasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordComponent],
      providers: [PasswordService],
    });
    fixture = TestBed.createComponent(PasswordComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PasswordService);
  });

  it('should show error if passwords do not match', () => {
    // GIVEN
    comp.password = 'password1';
    comp.confirmPassword = 'password2';
    // WHEN
    comp.changePassword();
    // THEN
    expect(comp.doNotMatch).toBe('ERROR');
    expect(comp.error).toBeNull();
    expect(comp.success).toBeNull();
  });

  it('should call the service when passwords match', () => {
    // GIVEN
    // deepcode ignore NoHardcodedPasswords/test: dummy value used only in unit test
    comp.password = comp.confirmPassword = 'myPassword';
    const saveSpy = jest.spyOn(service, 'save').mockReturnValue(of({}));
    // WHEN
    comp.changePassword();
    // THEN
    expect(saveSpy).toHaveBeenCalledWith('myPassword');
  });

  it('should set success to OK on success', () => {
    // GIVEN
    comp.password = comp.confirmPassword = 'myPassword';
    jest.spyOn(service, 'save').mockReturnValue(of({}));
    // WHEN
    comp.changePassword();
    // THEN
    expect(comp.doNotMatch).toBeNull();
    expect(comp.error).toBeNull();
    expect(comp.success).toBe('OK');
  });

  it('should notify of error if change password fails', () => {
    // GIVEN
    comp.password = comp.confirmPassword = 'myPassword';
    jest.spyOn(service, 'save').mockReturnValue(throwError(() => new Error()));
    // WHEN
    comp.changePassword();
    // THEN
    expect(comp.doNotMatch).toBeNull();
    expect(comp.success).toBeNull();
    expect(comp.error).toBe('ERROR');
  });
});
