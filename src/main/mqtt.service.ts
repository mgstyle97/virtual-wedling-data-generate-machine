import { Inject, Injectable } from '@nestjs/common';
import { MqttClient } from 'mqtt';
import mqttClientGenerator from '@main/mqtt-client.generator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class MqttService {
  private readonly mqttClients: Array<MqttClient>;

  constructor(@Inject(ConfigService) config: ConfigService) {
    this.mqttClients = mqttClientGenerator(config);
  }
}
