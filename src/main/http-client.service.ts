import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import CsvParser from '@main/csv.parser';
import WeldingData from '@main/welding-data';
import WeldingDataParser from '@main/welding-data.parser';

let dataSequence: number = 0;
let requestSequence: number = 1;
let clientNum: number = 0;

@Injectable()
export default class HttpClientService implements OnModuleInit {
  private readonly sensingDataPath: string;
  private readonly dataList: Array<WeldingData> = new Array<WeldingData>();
  private records: Array<string>;

  constructor(
    private readonly client: HttpService,
    private readonly schedulerRegistry: SchedulerRegistry,
    configService: ConfigService,
  ) {
    this.sensingDataPath = configService.get<string>('SENSING_DATA_PATH');
    clientNum = configService.get<number>('CLIENT_NUM');

    const intervalTime: number = configService.get<number>('INTERVAL_TIME');
    const intervalInstance = setInterval(
      this.sendData,
      intervalTime,
      this.client,
      this.dataList,
    );
    this.schedulerRegistry.addInterval('httpInterval', intervalInstance);
  }

  async onModuleInit(): Promise<void> {
    this.records = await CsvParser.csvFileToRecords(this.sensingDataPath);
    for (const record of this.records) {
      this.dataList.push(WeldingDataParser(record));
    }
  }

  sendData(client: HttpService, dataList: Array<WeldingData>) {
    console.time(`requestLabel - ${requestSequence}`);
    for (let i = 0; i < clientNum; i++) {
      dataSequence++;
      const index = dataSequence % dataList.length;
      const body: WeldingData = dataList[index];

      if (body !== undefined) {
        Promise.resolve(
          client.axiosRef.post('/sensing', body, {
            headers: {
              'Global-Request-Sequence': requestSequence,
              'Content-Type': 'application/json',
            },
          }),
        ).catch((err) => {
          if (err.errno === -104)
            console.error(
              `Request Sequence - ${requestSequence}: Out of Socket Count`,
            );
        });
      }
    }

    console.timeEnd(`requestLabel - ${requestSequence}`);
    requestSequence++;
  }
}
