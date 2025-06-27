import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { OperacionesService } from './operaciones.service';
import { Response } from 'express';

@Controller('operaciones') // localhost:3001/operaciones
export class OperacionesController {
  constructor(private readonly operService: OperacionesService) {}

  @Get() // localhost:3001/operaciones?operacion=suma&a=10&b=40
  operar(
    @Res() res: Response,
    @Query('operacion') operacion: string,
    @Query('a') a: string,
    @Query('b') b?: string, // Opcional para factorial
  ) {
    try {
      if (!operacion) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          resultado: null,
          mensaje: 'El parametro "operacion" es requerido'
        });
      }

      if (!a || isNaN(Number(a))) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          resultado: null,
          mensaje: 'El parametro "a" debe ser un numero valido'
        });
      }

      const numA = Number(a);
      let numB: number | undefined;

      // Para factorial, no necesitamos el parametro b
      if (operacion === 'factorial') {
        const calculo = this.operService.operar(operacion, numA);
        return res.status(HttpStatus.OK).json({
          resultado: calculo,
          mensaje: 'Operacion exitosa',
          operacion: operacion,
          parametros: { a: numA }
        });
      }

      // Para todas las demas operaciones, necesitamos el parametro b
      if (!b || isNaN(Number(b))) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          resultado: null,
          mensaje: 'El parametro "b" es requerido y debe ser un numero valido para esta operacion'
        });
      }

      numB = Number(b);
      const calculo = this.operService.operar(operacion, numA, numB);

      return res.status(HttpStatus.OK).json({
        resultado: calculo,
        mensaje: 'Operacion exitosa',
        operacion: operacion,
        parametros: { a: numA, b: numB }
      });

    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        resultado: null,
        mensaje: error.message || 'Error en la operacion'
      });
    }
  }
}