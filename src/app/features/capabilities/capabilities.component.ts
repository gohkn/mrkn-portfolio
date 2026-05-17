import { ChangeDetectionStrategy, Component } from '@angular/core';

import { EraCardComponent } from '@shared/components/era-card/era-card.component';
import { CAPABILITIES } from '@core/data/capabilities.data';

@Component({
  selector: 'app-capabilities',
  imports: [EraCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './capabilities.component.html',
  styleUrl: './capabilities.component.scss',
})
export class CapabilitiesComponent {
  protected readonly capabilities = CAPABILITIES;
}
