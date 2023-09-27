import csvParser from '@main/csv.parser';

describe('CSV Parser', () => {
  it('Parsing csv file', async () => {
    const records = await csvParser('config/test.csv');
    console.log(records.length);
    expect(records.length).not.toBe(0);
  });
});
