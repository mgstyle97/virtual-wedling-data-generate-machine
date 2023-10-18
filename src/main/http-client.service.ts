import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
import CsvParser from '@main/csv.parser';

class WeldingData {
  constructor(
    private readonly machineName: string,
    private readonly itemNo: string,
    private readonly workingTime: Date,
    private readonly thicknessOne: number,
    private readonly thicknessTwo: number,
    private readonly weldForce: number,
    private readonly weldCurrent: number,
    private readonly weldVoltage: number,
    private readonly weldTime: number,
    private readonly scaledWeldForce: string,
    private readonly scaledWeldCurrent: string,
    private readonly scaledWeldVoltage: string,
    private readonly scaledWeldTime: string,
  ) {}
}

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
    this.records = await CsvParser(this.sensingDataPath);
    for (const record of this.records) {
      this.dataList.push(
        new WeldingData(
          record[1],
          record[2],
          new Date(record[3]),
          Number(record[4]),
          Number(record[5]),
          Number(record[6]),
          Number(record[7]),
          Number(record[8]),
          Number(record[9]),
          record[10],
          record[11],
          record[12],
          record[13],
        ),
      );
    }
  }

  sendData(client: HttpService, dataList: Array<WeldingData>) {
    console.time(`requestLabel - ${requestSequence}`);
    for (let i = 0; i < clientNum; i++) {
      dataSequence++;
      const index = dataSequence % dataList.length;
      const body: WeldingData = dataList[index];

      Promise.resolve(
        client.axiosRef.post('/sensing', body, {
          headers: {
            'Global-Request-Sequence': requestSequence,
          },
        }),
      ).catch(() => {});
    }

    console.timeEnd(`requestLabel - ${requestSequence}`);
    requestSequence++;
  }
}
