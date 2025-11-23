import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EnergyMix } from "./energy-mix";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
  days: EnergyMix[] | null = null;
  chargingInfo: ChargingInfo | null = null;
  timeFrame: number = 1;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<EnergyMixDto>("/api/energy-mix").subscribe(result => {
      this.days = [];
      for(let i = 0; i < result.days.length; i++) {
        const day = result.days[i];
        const milliseconds_in_day = 1000 * 60 * 60 * 24;
        const date = new Date(Date.parse(result.startDate) + (milliseconds_in_day * i));
        this.days[i] = <EnergyMix> {
          date: date.toLocaleDateString(),
          cleanEnergy: day.avgCleanEnergy * 100,
          chartData: Object.keys(day)
            .filter((key: string) => key !== "avgCleanEnergy")
            .map((key: string)=> {
              return {
                name: key.substring(0, 1).toUpperCase()+ key.substring(1),
                value: (<any>day)[key] * 100
              };
            })
        };
      }
    });
  }

  protected onCalculate() {
    this.httpClient.get<ChargingInfoDto>("/api/charging-info", {
      params: {
        timeFrame: this.timeFrame,
      }
    }).subscribe(result => {
      const startDateTime = new Date(Date.parse(result.startDateTime));
      const endDateTime = new Date(Date.parse(result.endDateTime));
      this.chargingInfo = <ChargingInfo> {
        startDate: startDateTime.toLocaleDateString(),
        startTime: `${startDateTime.getHours().toString().padStart(2, '0')}:${startDateTime.getMinutes().toString().padStart(2, '0')}`,
        endDate: endDateTime.toLocaleDateString(),
        endTime: `${endDateTime.getHours().toString().padStart(2, '0')}:${endDateTime.getMinutes().toString().padStart(2, '0')}`,
        timeFrameHours: this.timeFrame,
        cleanEnergyPercent: Math.round(result.avgCleanEnergy * 100),
      };
    });
  }
}

interface ChargingInfo {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  timeFrameHours: number;
  cleanEnergyPercent: number;
}

interface ChargingInfoDto {
  startDateTime: string;
  endDateTime: string;
  avgCleanEnergy: number;
}

interface EnergyMixDto {
  startDate: string;
  days: EnergyMixDayDto[];
}

interface EnergyMixDayDto {
  biomass: number;
  coal: number;
  imports: number;
  gas: number;
  other: number;
  nuclear: number;
  hydro: number;
  solar: number;
  wind: number;
  avgCleanEnergy: number;
}
