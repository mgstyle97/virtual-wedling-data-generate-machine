import * as fs from 'fs';
import { parse } from 'csv-parse';

export default class CsvParser {
  static async csvFileToRecords(filename: string) {
    const records = [];
    const parser = fs.createReadStream(filename).pipe(parse());

    for await (const record of parser) {
      records.push(record);
    }

    return records;
  }

  static recordToCsvData(record: any): string {
    return [
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
    ].join();
  }
}
