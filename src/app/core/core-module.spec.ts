import 'reflect-metadata';
import { TestBed } from '@angular/core/testing';
import { CoreModule } from './core-module';

/**
 * Testes para o CoreModule
 * Verifica se o módulo core é criado corretamente
 */
describe('CoreModule', () => {
  let module: CoreModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
    });
    module = new CoreModule();
  });

  /**
   * Testa se o módulo é criado corretamente
   */
  it('should create', () => {
    expect(module).toBeTruthy();
    expect(module).toBeInstanceOf(CoreModule);
  });

  /**
   * Testa se o módulo pode ser importado pelo TestBed
   */
  it('should be importable by TestBed', () => {
    expect(() => {
      TestBed.configureTestingModule({
        imports: [CoreModule],
      });
    }).not.toThrow();
  });

  /**
   * Testa se o módulo não quebra quando instanciado diretamente
   */
  it('should instantiate without errors', () => {
    expect(() => new CoreModule()).not.toThrow();
  });
});
