import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { IconKey } from '@core/models/era.model';
import { IconRegistryService } from '@core/services/icon-registry.service';

/**
 * Renders a registered icon by key. Uses Angular's native template (no innerHTML)
 * so it's safe against XSS and clean for SonarQube.
 */
@Component({
  selector: 'app-icon',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @for (path of paths(); track path) {
        <path [attr.d]="path" />
      }
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class IconComponent {
  private readonly registry = inject(IconRegistryService);

  readonly name = input.required<IconKey>();
  readonly size = input<number>(24);

  protected readonly paths = computed(() => this.registry.getPaths(this.name()));
}
