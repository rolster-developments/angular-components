const regexHexadecimal = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

export interface ColorRgb {
  b: number;
  g: number;
  r: number;
}

export class ColorMaterial {
  public readonly rgb: ColorRgb;

  public readonly color: string;

  constructor(colorMaterial: string | ColorRgb) {
    if (typeof colorMaterial === 'string') {
      this.color = colorMaterial;
      this.rgb = ColorMaterial.hexToRgb(this.color);
    } else {
      this.rgb = colorMaterial as ColorRgb;
      this.color = ColorMaterial.rgbToHex(this.rgb);
    }
  }

  public get hex(): string {
    return ColorMaterial.rgbToHex(this.rgb);
  }

  public rgba(alpha: number): string {
    return `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${alpha})`;
  }

  public get brightness(): number {
    return (this.rgb.r * 299 + this.rgb.g * 587 + this.rgb.b * 114) / 1000;
  }

  public get isDark(): boolean {
    return this.brightness < 128;
  }

  public get isLight(): boolean {
    return !this.isDark;
  }

  public mix(colorMix: ColorMaterial): ColorMaterial {
    return ColorMaterial.multiply(this, colorMix);
  }

  public static hexToRgb(colorHex: string): ColorRgb {
    let r = 0;
    let g = 0;
    let b = 0;

    const result = regexHexadecimal.exec(colorHex);

    if (result) {
      r = parseInt(result[1], 16);
      g = parseInt(result[2], 16);
      b = parseInt(result[3], 16);
    }

    return { r, g, b };
  }

  public static rgbToHex(colorRgb: ColorRgb): string {
    const r = colorRgb.r.toString(16).padStart(2, '0');
    const g = colorRgb.g.toString(16).padStart(2, '0');
    const b = colorRgb.b.toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
  }

  public static multiply(
    color1: ColorMaterial,
    color2: ColorMaterial
  ): ColorMaterial {
    return new ColorMaterial({
      r: Math.floor((color1.rgb.r * color2.rgb.r) / 255),
      g: Math.floor((color1.rgb.g * color2.rgb.g) / 255),
      b: Math.floor((color1.rgb.b * color2.rgb.b) / 255)
    });
  }

  public static combineHex(baseColor: string, color: string, percentage = 100) {
    const baseMaterial = new ColorMaterial(baseColor);
    const colorMaterial = new ColorMaterial(color);

    return ColorMaterial.combine(baseMaterial, colorMaterial, percentage);
  }

  public static combine(
    baseColor: ColorMaterial,
    color: ColorMaterial,
    percentage = 100
  ) {
    const rgbBase = baseColor.rgb;
    const rgbColor = color.rgb;

    const flat = percentage / 100;

    const weight1 = (flat * 2 - 1 + 1) / 2;
    const weight2 = 1 - weight1;

    return new ColorMaterial({
      r: Math.floor(rgbColor.r * weight1 + rgbBase.r * weight2),
      g: Math.floor(rgbColor.g * weight1 + rgbBase.g * weight2),
      b: Math.floor(rgbColor.b * weight1 + rgbBase.b * weight2)
    });
  }
}
