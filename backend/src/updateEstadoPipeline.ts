import { Request, Response } from 'express';
import { UpdateEstadoRequest, UpdateEstadoResponse } from './types.js';
import { asociadosRepository } from './repository.js';
import { validarTransicion, validarAportePagado } from './validations.js';
import { MESSAGES, HTTP_STATUS } from './constants.js';

export const updateEstadoPipeline = (req: Request, res: Response): void => {
  try {
    const { asociadoId, nuevoEstado }: UpdateEstadoRequest = req.body;

    if (!asociadoId || !nuevoEstado) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.ERRORS.MISSING_PARAMS,
      } as UpdateEstadoResponse);
      return;
    }

    const asociado = asociadosRepository.findById(asociadoId);

    if (!asociado) {
      res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: MESSAGES.ERRORS.ASOCIADO_NOT_FOUND(asociadoId),
      } as UpdateEstadoResponse);
      return;
    }

    const validacionTransicion = validarTransicion(asociado.estado_pipeline, nuevoEstado);
    if (!validacionTransicion.valido) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: validacionTransicion.mensaje,
      } as UpdateEstadoResponse);
      return;
    }

    const validacionAporte = validarAportePagado(nuevoEstado, asociado.aporte_49900_pagado);
    if (!validacionAporte.valido) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: validacionAporte.mensaje,
      } as UpdateEstadoResponse);
      return;
    }

    const asociadoActualizado = asociadosRepository.update(asociadoId, {
      estado_pipeline: nuevoEstado,
      ultima_actualizacion: new Date().toISOString(),
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: MESSAGES.SUCCESS.UPDATE_ESTADO,
      asociado: asociadoActualizado,
    } as UpdateEstadoResponse);
  } catch (error) {
    console.error(MESSAGES.ERRORS.INTERNAL_SERVER, error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGES.ERRORS.INTERNAL_SERVER,
    } as UpdateEstadoResponse);
  }
};
