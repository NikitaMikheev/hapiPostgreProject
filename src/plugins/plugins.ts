import type Hapi from '@hapi/hapi';
import inert from '@hapi/inert';
import Swagger from 'hapi-swagger';
import Vision from '@hapi/vision';
import basic from '@hapi/basic';
import jwt from '@hapi/jwt';

const swaggerOptions: Swagger.RegisterOptions = {
  // настройка сваггера
  info: {
    title: 'Тест'
  }
};

export const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
  {
    plugin: inert
  },

  {
    plugin: basic
  },

  {
    plugin: jwt
  },

  {
    plugin: Vision
  },

  {
    plugin: Swagger,
    options: swaggerOptions
  }
];
