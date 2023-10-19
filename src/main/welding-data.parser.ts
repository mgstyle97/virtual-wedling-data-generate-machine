import WeldingData from '@main/welding-data';

export default (record: string): WeldingData => {
  return new WeldingData(
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
  );
};
