import { Test, TestingModule } from '@nestjs/testing';
import { OperacionesService } from './operaciones.service';

describe('OperacionesService', () => {
  let service: OperacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperacionesService],
    }).compile();
    service = module.get<OperacionesService>(OperacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Operacion Suma', () => {
    it('deberia sumar numeros positivos correctamente', () => {
      expect(service.operar('suma', 10, 30)).toBe(40);
      expect(service.operar('suma', 5, 7)).toBe(12);
    });

    it('deberia sumar numeros negativos correctamente', () => {
      expect(service.operar('suma', -10, 50)).toBe(40);
      expect(service.operar('suma', -10, -50)).toBe(-60);
      expect(service.operar('suma', -5, -3)).toBe(-8);
    });

    it('deberia sumar numeros decimales correctamente', () => {
      expect(service.operar('suma', Math.PI, 30)).toBeCloseTo(33.14, 2);
      expect(service.operar('suma', 1.5, 2.3)).toBeCloseTo(3.8, 1);
    });

    it('deberia manejar casos de borde - valores nulos y no numéricos', () => {
      expect(service.operar('suma', null as any, 50)).toBeNaN();
      expect(service.operar('suma', '10' as any, 50)).toBeNaN();
      expect(service.operar('suma', 10, 'abc' as any)).toBeNaN();
    });

    it('deberia lanzar error con valores indefinidos', () => {
      expect(() => service.operar('suma', undefined as any, 50)).toThrow('No se puede llamar con numeros indefinidos.');
      expect(() => service.operar('suma', 10, undefined as any)).toThrow('No se puede llamar con numeros indefinidos.');
    });
  });

  describe('Operacion Resta', () => {
    it('deberia restar numeros positivos correctamente', () => {
      expect(service.operar('resta', 50, 20)).toBe(30);
      expect(service.operar('resta', 100, 25)).toBe(75);
    });

    it('deberia restar numeros negativos correctamente', () => {
      expect(service.operar('resta', -10, -5)).toBe(-5);
      expect(service.operar('resta', 10, -5)).toBe(15);
      expect(service.operar('resta', -10, 5)).toBe(-15);
    });

    it('deberia restar numeros decimales correctamente', () => {
      expect(service.operar('resta', 10.5, 3.2)).toBeCloseTo(7.3, 1);
      expect(service.operar('resta', Math.PI, 1)).toBeCloseTo(2.14, 2);
    });

    it('deberia manejar casos de borde - valores nulos y no numéricos', () => {
      expect(service.operar('resta', null as any, 10)).toBeNaN();
      expect(service.operar('resta', 'abc' as any, 5)).toBeNaN();
      expect(service.operar('resta', 10, {} as any)).toBeNaN();
    });

    it('deberia lanzar error con valores indefinidos', () => {
      expect(() => service.operar('resta', undefined as any, 10)).toThrow('No se puede llamar con numeros indefinidos.');
      expect(() => service.operar('resta', 10, undefined as any)).toThrow('No se puede llamar con numeros indefinidos.');
    });
  });

  describe('Operacion Multiplicacion', () => {
    it('deberia multiplicar numeros positivos correctamente', () => {
      expect(service.operar('multiplicacion', 5, 4)).toBe(20);
      expect(service.operar('multiplicacion', 7, 8)).toBe(56);
    });

    it('deberia multiplicar numeros negativos correctamente', () => {
      expect(service.operar('multiplicacion', -5, 4)).toBe(-20);
      expect(service.operar('multiplicacion', -5, -4)).toBe(20);
      expect(service.operar('multiplicacion', 5, -4)).toBe(-20);
    });

    it('deberia multiplicar por cero correctamente', () => {
      expect(service.operar('multiplicacion', 5, 0)).toBe(0);
      expect(service.operar('multiplicacion', 0, 10)).toBe(0);
      expect(service.operar('multiplicacion', 0, 0)).toBe(0);
    });

    it('deberia multiplicar numeros decimales correctamente', () => {
      expect(service.operar('multiplicacion', 2.5, 4)).toBe(10);
      expect(service.operar('multiplicacion', 1.5, 2.2)).toBeCloseTo(3.3, 1);
    });

    it('deberia manejar casos de borde - valores nulos y no numéricos', () => {
      expect(service.operar('multiplicacion', null as any, 5)).toBeNaN();
      expect(service.operar('multiplicacion', 'test' as any, 5)).toBeNaN();
      expect(service.operar('multiplicacion', 5, [] as any)).toBeNaN();
    });

    it('deberia lanzar error con valores indefinidos', () => {
      expect(() => service.operar('multiplicacion', undefined as any, 5)).toThrow('No se puede llamar con numeros indefinidos.');
      expect(() => service.operar('multiplicacion', 5, undefined as any)).toThrow('No se puede llamar con numeros indefinidos.');
    });
  });

  describe('Operacion Division', () => {
    it('deberia dividir numeros positivos correctamente', () => {
      expect(service.operar('division', 20, 4)).toBe(5);
      expect(service.operar('division', 15, 3)).toBe(5);
    });

    it('deberia dividir numeros negativos correctamente', () => {
      expect(service.operar('division', -20, 4)).toBe(-5);
      expect(service.operar('division', -20, -4)).toBe(5);
      expect(service.operar('division', 20, -4)).toBe(-5);
    });

    it('deberia dividir numeros decimales correctamente', () => {
      expect(service.operar('division', 10, 3)).toBeCloseTo(3.333, 3);
      expect(service.operar('division', 7.5, 2.5)).toBe(3);
    });

    it('deberia lanzar error al dividir por cero', () => {
      expect(() => service.operar('division', 10, 0)).toThrow('No se puede dividir por cero');
      expect(() => service.operar('division', -5, 0)).toThrow('No se puede dividir por cero');
    });

    it('deberia manejar casos de borde - valores nulos y no numéricos', () => {
      expect(service.operar('division', null as any, 5)).toBeNaN();
      expect(service.operar('division', 'abc' as any, 5)).toBeNaN();
      expect(service.operar('division', 10, 'def' as any)).toBeNaN();
    });

    it('deberia lanzar error con valores indefinidos', () => {
      expect(() => service.operar('division', undefined as any, 5)).toThrow('No se puede llamar con numeros indefinidos.');
      expect(() => service.operar('division', 10, undefined as any)).toThrow('No se puede llamar con numeros indefinidos.');
    });
  });

  describe('Operacion Potencia', () => {
    it('deberia calcular potencias correctamente', () => {
      expect(service.operar('potencia', 2, 3)).toBe(8);
      expect(service.operar('potencia', 5, 2)).toBe(25);
      expect(service.operar('potencia', 10, 0)).toBe(1);
    });

    it('deberia manejar exponentes negativos', () => {
      expect(service.operar('potencia', 2, -2)).toBe(0.25);
      expect(service.operar('potencia', 4, -1)).toBe(0.25);
    });

    it('deberia manejar bases negativas', () => {
      expect(service.operar('potencia', -2, 3)).toBe(-8);
      expect(service.operar('potencia', -2, 2)).toBe(4);
    });

    it('deberia manejar numeros decimales', () => {
      expect(service.operar('potencia', 2.5, 2)).toBe(6.25);
      expect(service.operar('potencia', 9, 0.5)).toBe(3);
    });

    it('deberia manejar casos especiales', () => {
      expect(service.operar('potencia', 0, 5)).toBe(0);
      expect(service.operar('potencia', 1, 100)).toBe(1);
    });

    it('deberia manejar casos de borde - valores nulos y no numéricos', () => {
      expect(service.operar('potencia', null as any, 2)).toBeNaN();
      expect(service.operar('potencia', 'abc' as any, 2)).toBeNaN();
      expect(service.operar('potencia', 2, 'def' as any)).toBeNaN();
    });

    it('deberia lanzar error con valores indefinidos', () => {
      expect(() => service.operar('potencia', undefined as any, 2)).toThrow('No se puede llamar con numeros indefinidos.');
      expect(() => service.operar('potencia', 2, undefined as any)).toThrow('No se puede llamar con numeros indefinidos.');
    });
  });

  describe('Operacion Factorial', () => {
    it('deberia calcular factoriales basicos correctamente', () => {
      expect(service.operar('factorial', 0)).toBe(1);
      expect(service.operar('factorial', 1)).toBe(1);
      expect(service.operar('factorial', 5)).toBe(120);
      expect(service.operar('factorial', 4)).toBe(24);
    });

    it('deberia calcular factoriales grandes correctamente', () => {
      expect(service.operar('factorial', 6)).toBe(720);
      expect(service.operar('factorial', 7)).toBe(5040);
      expect(service.operar('factorial', 10)).toBe(3628800);
    });

    it('deberia lanzar error para numeros negativos', () => {
      expect(() => service.operar('factorial', -1)).toThrow('El factorial no esta definido para numeros negativos');
      expect(() => service.operar('factorial', -5)).toThrow('El factorial no esta definido para numeros negativos');
    });

    it('deberia lanzar error para numeros no enteros', () => {
      expect(() => service.operar('factorial', 3.5)).toThrow('El factorial solo esta definido para numeros enteros');
      expect(() => service.operar('factorial', Math.PI)).toThrow('El factorial solo esta definido para numeros enteros');
    });

    it('deberia manejar casos de borde - valores nulos y no numéricos', () => {
      expect(service.operar('factorial', null as any)).toBeNaN();
      expect(service.operar('factorial', 'abc' as any)).toBeNaN();
      expect(service.operar('factorial', {} as any)).toBeNaN();
    });

    it('deberia lanzar error con valores indefinidos', () => {
      expect(() => service.operar('factorial', undefined as any)).toThrow('No se puede llamar con numeros indefinidos.');
    });
  });


  describe('Tests de Integracion', () => {
    it('deberia manejar operaciones encadenadas conceptualmente', () => {
      // Suma: 2 + 3 = 5
      const suma = service.operar('suma', 2, 3);
      expect(suma).toBe(5);
      
      // Multiplicacion: 5 * 4 = 20
      const multiplicacion = service.operar('multiplicacion', suma, 4);
      expect(multiplicacion).toBe(20);
      
      // Division: 20 / 5 = 4
      const division = service.operar('division', multiplicacion, 5);
      expect(division).toBe(4);
      
      // Factorial: 4! = 24
      const factorial = service.operar('factorial', division);
      expect(factorial).toBe(24);
    });

    it('deberia manejar todas las operaciones con los mismos numeros', () => {
      const a = 6;
      const b = 2;
      
      expect(service.operar('suma', a, b)).toBe(8);
      expect(service.operar('resta', a, b)).toBe(4);
      expect(service.operar('multiplicacion', a, b)).toBe(12);
      expect(service.operar('division', a, b)).toBe(3);
      expect(service.operar('potencia', a, b)).toBe(36);
    });
  });
});