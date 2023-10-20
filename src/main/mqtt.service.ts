import { Injectable, OnModuleInit } from '@nestjs/common';
import { MqttClient } from 'mqtt';
import mqttClientGenerator from '@main/mqtt-client.generator';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import CsvParser from '@main/csv.parser';

let dataSequence: number = 0;

@Injectable()
export default class MqttService implements OnModuleInit {
  private readonly mqttClients: Array<MqttClient> = new Array<MqttClient>();
  private readonly sensingDataPath: string;
  private readonly intervalTime: number;
  private dataList: Array<string> = new Array<string>();

  constructor(
    config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.mqttClients = mqttClientGenerator(config);
    this.sensingDataPath = config.get<string>('SENSING_DATA_PATH');
    this.intervalTime = config.get<number>('INTERVAL_TIME');
  }

  async onModuleInit(): Promise<any> {
    const records = await CsvParser.csvFileToRecords(this.sensingDataPath);
    for (const record of records) {
      this.dataList.push(CsvParser.recordToCsvData(record));
    }

    const intervalInstance = setInterval(
      this.sendData,
      this.intervalTime,
      this.mqttClients,
      this.dataList,
    );
    this.schedulerRegistry.addInterval('mqttInterval', intervalInstance);
  }

  async sendData(clients: Array<MqttClient>, dataList: Array<string>) {
    clients.forEach((client) => {
      const dataIdx = dataSequence++ % dataList.length;
      const message = dataList[dataIdx];
      if (message !== undefined) client.publish('thesis/data', message);
    });
  }
}
