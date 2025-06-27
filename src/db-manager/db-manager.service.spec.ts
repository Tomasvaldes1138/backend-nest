import { Test, TestingModule } from '@nestjs/testing';
import { DbManagerService } from './db-manager.service';

describe('DbManagerService', () => {
  let service: DbManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbManagerService],
    }).compile();

    service = module.get<DbManagerService>(DbManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

 it('deberia ser una instancia de DbManagerService', () => {
    expect(service).toBeInstanceOf(DbManagerService);
  });

  describe('getUser', () => {
    it('deberia retornar un objeto usuario con el id proporcionado y nombre por defecto', () => {

      const idUsuario = 1;
      const usuarioEsperado = { id: 1, nombre: 'Josefa' };


      const resultado = service.getUser(idUsuario);


      expect(resultado).toEqual(usuarioEsperado);
      expect(resultado).toStrictEqual(usuarioEsperado);
    });

    it('deberia retornar el objeto usuario correcto para diferentes ids', () => {

      const casosDePrueba = [
        { entrada: 1, esperado: { id: 1, nombre: 'Josefa' } },
        { entrada: 42, esperado: { id: 42, nombre: 'Josefa' } },
        { entrada: 999, esperado: { id: 999, nombre: 'Josefa' } },
      ];

      casosDePrueba.forEach(({ entrada, esperado }) => {
        const resultado = service.getUser(entrada);
        expect(resultado).toEqual(esperado);
        expect(resultado.id).toBe(entrada);
        expect(resultado.nombre).toBe('Josefa');
      });
    });

    it('deberia manejar cero como id', () => {

      const idUsuario = 0;
      const usuarioEsperado = { id: 0, nombre: 'Josefa' };


      const resultado = service.getUser(idUsuario);


      expect(resultado).toEqual(usuarioEsperado);
      expect(resultado.id).toBe(0);
    });

    it('deberia manejar números negativos como id', () => {

      const idUsuario = -1;
      const usuarioEsperado = { id: -1, nombre: 'Josefa' };


      const resultado = service.getUser(idUsuario);


      expect(resultado).toEqual(usuarioEsperado);
      expect(resultado.id).toBe(-1);
    });

    it('deberia retornar un objeto con las propiedades correctas', () => {

      const idUsuario = 123;


      const resultado = service.getUser(idUsuario);


      expect(resultado).toHaveProperty('id');
      expect(resultado).toHaveProperty('nombre');
      expect(typeof resultado.id).toBe('number');
      expect(typeof resultado.nombre).toBe('string');
      expect(Object.keys(resultado)).toHaveLength(2);
    });

    it('deberia siempre retornar "Josefa" como nombre sin importar el id', () => {

      const idsParaPrueba = [1, 100, 500, 1000];

      idsParaPrueba.forEach(id => {
        const resultado = service.getUser(id);
        expect(resultado.nombre).toBe('Josefa');
        expect(resultado.id).toBe(id);
      });
    });

    it('deberia funcionar con números decimales como id', () => {

      const idUsuario = 1.5;
      const usuarioEsperado = { id: 1.5, nombre: 'Josefa' };


      const resultado = service.getUser(idUsuario);


      expect(resultado).toEqual(usuarioEsperado);
    });

    it('deberia manejar números muy grandes como id', () => {

      const idUsuario = 999999999999;
      const usuarioEsperado = { id: 999999999999, nombre: 'Josefa' };


      const resultado = service.getUser(idUsuario);


      expect(resultado).toEqual(usuarioEsperado);
    });

    it('deberia retornar un nuevo objeto en cada llamada', () => {

      const idUsuario = 1;


      const resultado1 = service.getUser(idUsuario);
      const resultado2 = service.getUser(idUsuario);


      expect(resultado1).toEqual(resultado2);
      expect(resultado1).not.toBe(resultado2);
    });
  });
});
