import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SchoolTheme } from '../../models/school.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<SchoolTheme>({
    primaryColor: '#4f46e5',
    secondaryColor: '#6c757d'
  });

  public currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    this.loadSavedTheme();
  }

  setTheme(theme: SchoolTheme): void {
    this.currentThemeSubject.next(theme);
    this.applyTheme(theme);
    this.saveTheme(theme);
  }

  private applyTheme(theme: SchoolTheme): void {
    const root = document.documentElement;
    
    // Convert hex to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const primaryRgb = hexToRgb(theme.primaryColor);
    const secondaryRgb = hexToRgb(theme.secondaryColor);

    if (primaryRgb) {
      root.style.setProperty('--bs-primary', theme.primaryColor);
      root.style.setProperty('--bs-primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
    }

    if (secondaryRgb) {
      root.style.setProperty('--bs-secondary', theme.secondaryColor);
    }

    if (theme.fontFamily) {
      root.style.setProperty('font-family', theme.fontFamily);
    }

    // Update gradient
    root.style.setProperty('--primary-gradient', 
      `linear-gradient(135deg, ${theme.primaryColor}, ${this.adjustColorBrightness(theme.primaryColor, -20)})`);
  }

  private adjustColorBrightness(hex: string, percent: number): string {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  }

  private saveTheme(theme: SchoolTheme): void {
    localStorage.setItem('schoolTheme', JSON.stringify(theme));
  }

  private loadSavedTheme(): void {
    const savedTheme = localStorage.getItem('schoolTheme');
    if (savedTheme) {
      const theme = JSON.parse(savedTheme);
      this.applyTheme(theme);
      this.currentThemeSubject.next(theme);
    }
  }

  resetToDefault(): void {
    const defaultTheme: SchoolTheme = {
      primaryColor: '#4f46e5',
      secondaryColor: '#6c757d'
    };
    this.setTheme(defaultTheme);
  }
}
