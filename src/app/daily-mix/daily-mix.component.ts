import { Component, Input } from '@angular/core';
import { EnergyMix } from "../energy-mix";

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

  loadingData = [
    {
      name: "Loading...",
      value: 100,
    }
  ]
}
