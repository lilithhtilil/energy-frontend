import { Component, Input } from '@angular/core';
import { EnergyMix } from "../energy-mix";
import { Color, ScaleType } from "@swimlane/ngx-charts";

@Component({
  selector: 'app-daily-mix',
  templateUrl: './daily-mix.component.html',
  styleUrl: './daily-mix.component.css'
})
export class DailyMixComponent {
  protected readonly Math = Math;

  @Input() title: string | null = null;
  @Input() energyMix: EnergyMix | null = null;
  @Input() size: [number, number] = [200, 200];
  @Input() showLegend: boolean = false;

  colorScheme: Color = {
    name: "green",
    selectable: false,
    group: ScaleType.Linear,
    domain: ['#A1D99B', '#4E4E4E', '#685A5A', '#BFBFBF', '#8C7878', '#41AB5D', '#006D2C', '#C7E9C0', '#74C476']
  }

  loadingData = [
    {
      name: "Loading...",
      value: 100,
    }
  ]
}
