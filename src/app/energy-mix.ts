export interface EnergyMix {
  date: string;
  cleanEnergy: number;
  chartData: { name: string; value: number }[];
}
