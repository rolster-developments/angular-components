import { ColorMaterial, ColorRgb } from './color';

export interface PaletteMaterialFont {
  disabled: string;
  primary: string;
  secondary: string;
}

export interface PaletteMaterialColor {
  color: string;
  key: string;
  material: ColorMaterial;
  rgb: string;
  border?: string;
  font?: PaletteMaterialFont;
  ripple?: string;
}

export interface PaletteMaterialModel {
  v050: PaletteMaterialColor;
  v100: PaletteMaterialColor;
  v200: PaletteMaterialColor;
  v300: PaletteMaterialColor;
  v400: PaletteMaterialColor;
  v500: PaletteMaterialColor;
  v600: PaletteMaterialColor;
  v700: PaletteMaterialColor;
  v800: PaletteMaterialColor;
  v900: PaletteMaterialColor;
}

const LIGHT_COLOR = { r: 255, g: 255, b: 255 };
const DARK_COLOR = { r: 34, g: 34, b: 34 };

const WHITE_COLOR = { r: 255, g: 255, b: 255 };
const BLACK_COLOR = { r: 0, g: 0, b: 0 };

export class PaletteMaterial {
  public readonly catalog: Array<PaletteMaterialColor>;

  private model: PaletteMaterialModel;

  constructor(
    private color: string,
    public name?: string
  ) {
    this.model = this.createModel(this.color);

    this.catalog = [
      this.v050,
      this.v100,
      this.v200,
      this.v300,
      this.v400,
      this.v500,
      this.v600,
      this.v700,
      this.v800,
      this.v900
    ];

    this.catalog.forEach((color) => this.configColor(color));
  }

  public get v050(): PaletteMaterialColor {
    return this.model.v050;
  }

  public get v100(): PaletteMaterialColor {
    return this.model.v100;
  }

  public get v200(): PaletteMaterialColor {
    return this.model.v200;
  }

  public get v300(): PaletteMaterialColor {
    return this.model.v300;
  }

  public get v400(): PaletteMaterialColor {
    return this.model.v400;
  }

  public get v500(): PaletteMaterialColor {
    return this.model.v500;
  }

  public get v600(): PaletteMaterialColor {
    return this.model.v600;
  }

  public get v700(): PaletteMaterialColor {
    return this.model.v700;
  }

  public get v800(): PaletteMaterialColor {
    return this.model.v800;
  }

  public get v900(): PaletteMaterialColor {
    return this.model.v900;
  }

  private createModel(color: string): PaletteMaterialModel {
    const light = new ColorMaterial(LIGHT_COLOR);
    const dark = new ColorMaterial(DARK_COLOR);

    const theme = new ColorMaterial(color);

    return {
      v050: this.createColor('050', theme, dark, 16),
      v100: this.createColor('100', theme, dark, 36),
      v200: this.createColor('200', theme, dark, 54),
      v300: this.createColor('300', theme, dark, 72),
      v400: this.createColor('400', theme, dark, 86),
      v500: this.createColor('500', theme, light, 100),
      v600: this.createColor('600', theme, light, 74),
      v700: this.createColor('700', theme, light, 58),
      v800: this.createColor('800', theme, light, 40),
      v900: this.createColor('900', theme, light, 16)
    };
  }

  private createColor(
    key: string,
    color: ColorMaterial,
    base: ColorMaterial,
    percentage: number
  ): PaletteMaterialColor {
    const material = ColorMaterial.combine(base, color, percentage);

    return {
      color: material.hex,
      rgb: material.rgba(1),
      material: material,
      key: key
    };
  }

  private configColor(color: PaletteMaterialColor): void {
    const isDark = color.material.isDark;
    let rgb: ColorRgb;

    switch (color.key) {
      case '300':
        rgb = isDark ? WHITE_COLOR : BLACK_COLOR;
        break;

      case '400':
        rgb = isDark ? WHITE_COLOR : BLACK_COLOR;
        break;

      case '500':
        rgb = isDark ? WHITE_COLOR : BLACK_COLOR;
        break;

      default:
        rgb = isDark ? this.v800.material.rgb : this.v050.material.rgb;
        break;
    }

    isDark ? this.configDark(color, rgb) : this.configLight(color, rgb);
  }

  private configDark(color: PaletteMaterialColor, rgb: ColorRgb): void {
    color.border = this.configBorderDark(rgb);
    color.font = this.configFontDark(rgb);
    color.ripple = this.configRippleDark(rgb);
  }

  private configLight(color: PaletteMaterialColor, rgb: ColorRgb): void {
    color.border = this.configBorderLight(rgb);
    color.font = this.configFontLight(rgb);
    color.ripple = this.configRippleLight(rgb);
  }

  private configFontDark(color: ColorRgb): PaletteMaterialFont {
    return {
      primary: this.rgba(color, 1),
      secondary: this.rgba(color, 0.7),
      disabled: this.rgba(color, 0.5)
    };
  }

  private configFontLight(color: ColorRgb): PaletteMaterialFont {
    return {
      primary: this.rgba(color, 0.92),
      secondary: this.rgba(color, 0.56),
      disabled: this.rgba(color, 0.38)
    };
  }

  private configBorderDark(color: ColorRgb): string {
    return this.rgba(color, 0.12);
  }

  private configBorderLight(color: ColorRgb): string {
    return this.rgba(color, 0.12);
  }

  private configRippleDark(color: ColorRgb): string {
    return this.rgba(color, 0.38);
  }

  private configRippleLight(color: ColorRgb): string {
    return this.rgba(color, 0.5);
  }

  private rgba(rgb: ColorRgb, alpha: number): string {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  }
}
