import * as fs from 'fs';
import { parse } from 'csv-parse';

export default async (filename: string) => {
  const records = [];
  const parser = fs.createReadStream(filename).pipe(parse());

  for await (const record of parser) {
    records.push(record);
  }

  return records;
};
