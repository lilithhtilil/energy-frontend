import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css"
})
export class AppComponent implements OnInit {
  energyMix: EnergyMix | null = null;
  loadingData = [
    {
      name: "Loading...",
      value: 100,
    }
  ]

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<EnergyMixDto>("/api/energy-mix").subscribe(result => {
      const today = result.days[0];
      this.energyMix = {
        date: result.startDate,
        cleanEnergy: today.avgCleanEnergy * 100,
        chartData: Object.keys(today)
          .filter((key: string) => key !== "avgCleanEnergy")
          .map((key: string)=> {
            return {
              name: key.substring(0, 1).toUpperCase()+ key.substring(1),
              value: (<any>today)[key] * 100
            };
          })
      };

      // this.energyMix = Object.keys(result.days[0])
      //   .filter((key: string) => key !== "avgCleanEnergy")
      //   .map((key: string) => {
      //   return {
      //     name: key.substring(0, 1).toUpperCase()+ key.substring(1),
      //     value: (<any>result.days[0])[key]
      //   };
      // });
    });

  }

  protected readonly Math = Math;
}

interface EnergyMix {
  date: string;
  cleanEnergy: number;
  chartData: {name: string; value: number}[];
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
