import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('deberia retornar "Hello World!!"', () => {
      const result = service.getHello();
      expect(result).toBe('Hello Mundo!!');
      expect(typeof result).toBe('string');
    });

    it('deberia retornar un string no vacio', () => {
      const result = service.getHello();
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('getHelloAleman', () => {
    it('deberia retornar "Hallo Welt"', () => {
      const result = service.getHelloAleman();
      expect(result).toBe('Hallo Welt');
      expect(typeof result).toBe('string');
    });

    it('deberia retornar un string no vacio', () => {
      const result = service.getHelloAleman();
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    it('deberia contener texto en aleman', () => {
      const result = service.getHelloAleman();
      expect(result).toContain('Hallo');
      expect(result).toContain('Welt');
    });
  });

  describe('getHelloFrances', () => {
    it('deberia retornar "mi mensaje de pruebas"', () => {
      const result = service.getHelloFrances();
      expect(result).toBe('mi mensaje de pruebas');
      expect(typeof result).toBe('string');
    });

    it('deberia retornar un string no vacio', () => {
      const result = service.getHelloFrances();
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    it('deberia contener la palabra "mensaje"', () => {
      const result = service.getHelloFrances();
      expect(result).toContain('mensaje');
    });
  });

  describe('getHelloEspanol', () => {
    it('deberia retornar "Hola Mundo!!"', () => {
      const result = service.getHelloEspanol();
      expect(result).toBe('Hola Mundo!!');
      expect(typeof result).toBe('string');
    });

    it('deberia retornar un string no vacio', () => {
      const result = service.getHelloEspanol();
      expect(result).toBeTruthy();
      expect(result.length).toBeGreaterThan(0);
    });

    it('deberia contener texto en español', () => {
      const result = service.getHelloEspanol();
      expect(result).toContain('Hola');
      expect(result).toContain('Mundo');
    });

    it('deberia terminar con signos de exclamacion', () => {
      const result = service.getHelloEspanol();
      expect(result).toMatch(/!!$/);
    });
  });

  describe('Tests de Integracion', () => {
    it('todos los metodos deberian retornar strings', () => {
      expect(typeof service.getHello()).toBe('string');
      expect(typeof service.getHelloAleman()).toBe('string');
      expect(typeof service.getHelloFrances()).toBe('string');
      expect(typeof service.getHelloEspanol()).toBe('string');
    });

    it('todos los metodos deberian retornar valores unicos', () => {
      const hello = service.getHello();
      const helloAleman = service.getHelloAleman();
      const helloFrances = service.getHelloFrances();
      const helloEspanol = service.getHelloEspanol();

      const results = [hello, helloAleman, helloFrances, helloEspanol];
      const uniqueResults = [...new Set(results)];
      
      expect(uniqueResults.length).toBe(4);
    });

    it('ningun metodo deberia retornar string vacio', () => {
      expect(service.getHello()).not.toBe('');
      expect(service.getHelloAleman()).not.toBe('');
      expect(service.getHelloFrances()).not.toBe('');
      expect(service.getHelloEspanol()).not.toBe('');
    });

    it('todos los metodos deberian ser consistentes en multiples llamadas', () => {
      expect(service.getHello()).toBe(service.getHello());
      expect(service.getHelloAleman()).toBe(service.getHelloAleman());
      expect(service.getHelloFrances()).toBe(service.getHelloFrances());
      expect(service.getHelloEspanol()).toBe(service.getHelloEspanol());
    });

    it('deberia tener todos los metodos definidos', () => {
      expect(service.getHello).toBeDefined();
      expect(service.getHelloAleman).toBeDefined();
      expect(service.getHelloFrances).toBeDefined();
      expect(service.getHelloEspanol).toBeDefined();
      
      expect(typeof service.getHello).toBe('function');
      expect(typeof service.getHelloAleman).toBe('function');
      expect(typeof service.getHelloFrances).toBe('function');
      expect(typeof service.getHelloEspanol).toBe('function');
    });
  });

  describe('Tests de Comportamiento', () => {
    it('los metodos no deberian modificar el estado del servicio', () => {
      const initialService = { ...service };
      
      service.getHello();
      service.getHelloAleman();
      service.getHelloFrances();
      service.getHelloEspanol();

      expect(Object.keys(service)).toEqual(Object.keys(initialService));
    });

    it('deberia manejar multiples llamadas simultaneas', () => {
      const promises = [
        Promise.resolve(service.getHello()),
        Promise.resolve(service.getHelloAleman()),
        Promise.resolve(service.getHelloFrances()),
        Promise.resolve(service.getHelloEspanol()),
      ];

      return Promise.all(promises).then(results => {
        expect(results).toHaveLength(4);
        expect(results[0]).toBe('Hello World!!');
        expect(results[1]).toBe('Hallo Welt');
        expect(results[2]).toBe('mi mensaje de pruebas');
        expect(results[3]).toBe('Hola Mundo!!');
      });
    });
  });
});