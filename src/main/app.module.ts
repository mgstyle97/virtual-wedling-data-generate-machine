import { Module } from '@nestjs/common';
import MqttService from './mqtt.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';
import { HttpModule } from '@nestjs/axios';
import HttpClientService from '@main/http-client.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `config/.env.${process.env.NODE_ENV}`,
    }),
    HttpModule.register({
      baseURL: process.env.MAIN_SERVER,
    }),
    ScheduleModule.forRoot(),
  ],
  providers: [MqttService, HttpClientService],
})
export class AppModule {}
