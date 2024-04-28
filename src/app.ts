import dotenv from 'dotenv';
import express from 'express';
import "reflect-metadata";
import { useExpressServer } from 'routing-controllers';
import server  from './server';

dotenv.config();


const startServer =  async ()=>{
  
    const app = await server();

    app.use(express.static(__dirname + './../public'));
    useExpressServer(app, {
      development: false,
      routePrefix: '/api',
      // middlewares: [AuthMiddleware],
      controllers: [
        __dirname + '/api/controllers/**/*.ts',
        __dirname + '/api/controllers/**/*.js',
      ],
    });

    app.listen(process.env.PORT,()=>{
        console.log("Sever is listening on port ",process.env.port)
    })
}

startServer()