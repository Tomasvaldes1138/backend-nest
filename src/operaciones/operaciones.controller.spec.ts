import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('/operaciones (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });


  describe('GET /operaciones?operacion=suma', () => {
    it('debería sumar numeros positivos correctamente', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=suma&a=10&b=30')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(40);
          expect(res.body.operacion).toBe('suma');
        });
    });

    it('debería sumar numeros negativos correctamente', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=suma&a=-10&b=-50')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(-60);
        });
    });

    it('debería manejar numeros decimales', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=suma&a=1.5&b=2.3')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBeCloseTo(3.8, 1);
        });
    });


  });

  describe('GET /operaciones?operacion=resta', () => {
    it('debería restar numeros correctamente', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=resta&a=50&b=20')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(30);
          expect(res.body.operacion).toBe('resta');
        });
    });

    it('debería manejar numeros negativos', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=resta&a=-10&b=-5')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(-5);
        });
    });
  });

  describe('GET /operaciones?operacion=multiplicacion', () => {
    it('debería multiplicar numeros correctamente', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=multiplicacion&a=5&b=4')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(20);
        });
    });

    it('debería manejar multiplicación por cero', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=multiplicacion&a=5&b=0')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(0);
        });
    });
  });

  describe('GET /operaciones?operacion=division', () => {
    it('debería dividir numeros correctamente', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=division&a=20&b=4')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(5);
        });
    });


    it('debería manejar divisiones con decimales', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=division&a=10&b=3')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBeCloseTo(3.333, 3);
        });
    });
  });

  describe('GET /operaciones?operacion=potencia', () => {
    it('debería calcular potencias correctamente', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=potencia&a=2&b=3')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(8);
        });
    });

    it('debería manejar exponente cero', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=potencia&a=10&b=0')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(1);
        });
    });

    it('debería manejar exponentes negativos', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=potencia&a=2&b=-2')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(0.25);
        });
    });
  });

  describe('GET /operaciones?operacion=factorial', () => {
    it('debería calcular factoriales correctamente', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=factorial&a=5')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(120);
        });
    });

    it('debería manejar factorial de 0', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=factorial&a=0')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(1);
        });
    });


    it('debería manejar factorial sin parámetro b', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=factorial&a=4')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(24);
        });
    });
  });

  describe('GET /operaciones - Casos de Error', () => {

    it('debería retornar error 400 con query params vacíos', () => {
      return request(app.getHttpServer())
        .get('/operaciones')
        .expect(400);
    });

    it('debería manejar parámetros con espacios', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=suma&a=10&b=20')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(30);
        });
    });
  });

  describe('Tests de Integración Avanzados', () => {
    it('debería manejar multiples operaciones secuenciales', async () => {
      // Primera operación: 2 + 3 = 5
      const suma = await request(app.getHttpServer())
        .get('/operaciones?operacion=suma&a=2&b=3')
        .expect(200);
      
      expect(suma.body.resultado).toBe(5);
      
      // Segunda operación: 5 * 4 = 20
      const multiplicacion = await request(app.getHttpServer())
        .get(`/operaciones?operacion=multiplicacion&a=${suma.body.resultado}&b=4`)
        .expect(200);
      
      expect(multiplicacion.body.resultado).toBe(20);
      
      // Tercera operación: 20 / 5 = 4
      const division = await request(app.getHttpServer())
        .get(`/operaciones?operacion=division&a=${multiplicacion.body.resultado}&b=5`)
        .expect(200);
      
      expect(division.body.resultado).toBe(4);
    });

    it('debería manejar numeros muy grandes', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=suma&a=999999999999&b=1')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBe(1000000000000);
        });
    });

    it('debería manejar numeros muy pequeños', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=suma&a=0.000000001&b=0.000000002')
        .expect(200)
        .expect(res => {
          expect(res.body.resultado).toBeCloseTo(0.000000003, 9);
        });
    });


    it('debería manejar headers HTTP correctamente', () => {
      return request(app.getHttpServer())
        .get('/operaciones?operacion=suma&a=1&b=1')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(res => {
          expect(res.body.resultado).toBe(2);
        });
    });
  });
});