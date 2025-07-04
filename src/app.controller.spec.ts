import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbManagerService } from './db-manager/db-manager.service';

describe('AppController', () => {
  let appController: AppController;

  let mockDbService: { getUser: jest.Mock };

  beforeEach(async () => {
    mockDbService = {
      getUser: jest.fn().mockReturnValue({ id: 1, nombre: 'Loreto' }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: DbManagerService, useValue: mockDbService },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

describe('Probar el modulo raiz del proyecto', () => {


    test('Deberia retornar string vacio para saludo en español', () => {
      expect(appController.getHelloEspanol()).toBe('');
    });

    it('Deberia buscar un id por usuario', () => {
      expect(appController.getUser(2342)).toEqual({ id: 1, nombre: 'Loreto' });
      expect(mockDbService.getUser).toHaveBeenLastCalledWith(2342);
    });

    it('Deberia buscar usuario con diferentes ids', () => {
      const idsParaPrueba = [1, 100, 999];
      
      idsParaPrueba.forEach(id => {
        appController.getUser(id);
        expect(mockDbService.getUser).toHaveBeenCalledWith(id);
      });
    });

    it('Deberia manejar id cero para usuario', () => {
      expect(appController.getUser(0)).toEqual({ id: 1, nombre: 'Loreto' });
      expect(mockDbService.getUser).toHaveBeenCalledWith(0);
    });
  });

  describe('Verificacion de dependencias', () => {
    it('Deberia estar definido el controlador', () => {
      expect(appController).toBeDefined();
    });

    it('Deberia ser una instancia de AppController', () => {
      expect(appController).toBeInstanceOf(AppController);
    });
  });
});
