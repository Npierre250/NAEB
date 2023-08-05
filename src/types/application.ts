export interface Application {
  name: string;
  idNumber: number | string;
  phoneNumber: string | number;
  farmLocation: string;
  farmLength: number | string;
  productionSeason: number | string;
  desiredProducts: number | string;
  tinNumber: number | string;
  licenceCopy: File | string;
}
