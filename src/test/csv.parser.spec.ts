import CsvParser from '@main/csv.parser';

describe('CSV Parser', () => {
  it('Parsing csv file', async () => {
    const records = await CsvParser.csvFileToRecords('config/test.csv');

    expect(records.length).not.toBe(0);
  });
});
