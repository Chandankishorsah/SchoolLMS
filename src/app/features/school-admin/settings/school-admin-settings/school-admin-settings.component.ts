import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from '../../../../core/services/theme/theme.service';

@Component({
  selector: 'app-school-admin-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './school-admin-settings.component.html',
  styleUrl: './school-admin-settings.component.scss'
})
export class SchoolAdminSettingsComponent {
private fb = inject(FormBuilder);
  private themeService = inject(ThemeService);

  themeForm: FormGroup;
  themePresets: any;
  selectedPreset = 'indigo';

  constructor() {
    this.themePresets = this.themeService.getThemePresets();
    const currentTheme = this.themeService.getCurrentTheme();
    
    this.themeForm = this.fb.group({
      primaryColor: [currentTheme.primaryColor],
      secondaryColor: [currentTheme.secondaryColor]
    });
  }

  selectPreset(presetName: any): void {
    this.selectedPreset = presetName;
    const preset = this.themePresets[presetName];
    if (preset) {
      this.themeForm.patchValue({
        primaryColor: preset.primaryColor,
        secondaryColor: preset.secondaryColor
      });
    }
  }

  saveTheme(): void {
    if (this.themeForm.valid) {
      const formValue = this.themeForm.value;
      this.themeService.setTheme({
        ...formValue,
        fontFamily: 'Inter, sans-serif'
      });
    }
  }
}
