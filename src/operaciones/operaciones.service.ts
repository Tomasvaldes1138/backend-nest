import { Injectable } from '@nestjs/common';

@Injectable()
export class OperacionesService {
  operar(operacion: string = '', a: number, b?: number) {
    if (operacion === 'suma') {
      return this.#suma(a, b);
    } else if (operacion === 'resta') {
      return this.#resta(a, b);
    } else if (operacion === 'multiplicacion') {
      return this.#multiplicacion(a, b);
    } else if (operacion === 'division') {
      return this.#division(a, b);
    } else if (operacion === 'potencia') {
      return this.#potencia(a, b);
    } else if (operacion === 'factorial') {
      return this.#factorial(a);
    } else {
      throw new Error(`Operación "${operacion}" no es valida`);
    }
  }

  #suma(a: number, b?: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a + b;
  }

  #resta(a: number, b?: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a - b;
  }

  #multiplicacion(a: number, b?: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return a * b;
  }

  #division(a: number, b?: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    if (b === 0) {
      throw new Error('No se puede dividir por cero');
    }
    return a / b;
  }

  #potencia(a: number, b?: number) {
    if (a === undefined || b === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
      return NaN;
    }
    return Math.pow(a, b);
  }

  #factorial(a: number) {
    if (a === undefined) {
      throw new Error('No se puede llamar con numeros indefinidos.');
    }
    if (typeof a !== 'number') {
      return NaN;
    }
    if (a < 0) {
      throw new Error('El factorial no esta definido para numeros negativos');
    }
    if (!Number.isInteger(a)) {
      throw new Error('El factorial solo esta definido para numeros enteros');
    }
    if (a === 0 || a === 1) {
      return 1;
    }
    
    let resultado = 1;
    for (let i = 2; i <= a; i++) {
      resultado *= i;
    }
    return resultado;
  }
}