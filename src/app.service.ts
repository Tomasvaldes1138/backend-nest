import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Mundo!!';
  }

  getHelloAleman(): string {
    return 'Hallo Welt';
  }

  getHelloFrances(): string {
    return 'mi mensaje de pruebas';
  }

  getHelloEspanol(): string {
    return 'Hola Mundo!!';
  }
}
