import { IChild, IFrequencyData } from "./IFrequencyData";

export class FrequencyData {
  id: number;
  int: number;
  color: string;
  child: IChild;
  float: number;
  // @Type(() => Date)
  // @Transform(value => value.toLocaleDateString(), { toPlainOnly: true })
  date: Date;

  constructor() {

  }
}
