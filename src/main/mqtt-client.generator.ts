import { connect, IClientOptions, MqttClient } from 'mqtt';
import { ConfigService } from '@nestjs/config';

export default (config: ConfigService) => {
  const mqttClients: Array<MqttClient> = new Array<MqttClient>();

  const clientNum = config.get<number>('CLIENT_NUM');
  for (let idx = 1; idx <= clientNum; idx++) {
    const clientOption: IClientOptions = {
      port: config.get<number>('PORT'),
      username: config.get<string>('USERNAME'),
      password: config.get<string>('PASSWORD'),
      protocolVersion: 4,
    };

    const client = connect(config.get<string>('BROKER_URL'), clientOption);
    mqttClients.push(client);
  }

  return mqttClients;
};
