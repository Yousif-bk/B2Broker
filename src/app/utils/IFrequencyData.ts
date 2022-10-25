export interface IFrequencyData{
    id: number;
    int:number
    color: string;
    child: IChild;
    float: number;
}

export interface IChild{
  id:string,
  color:string
}
