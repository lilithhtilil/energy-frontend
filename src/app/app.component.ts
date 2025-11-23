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
