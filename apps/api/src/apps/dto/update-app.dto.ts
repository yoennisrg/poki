import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { APP_CATEGORIES, AppCategory, AppControls } from '../app.entity';
import { IsGameUrl } from './validators';

class ControlsDto implements AppControls {
  @IsIn(['keyboard', 'touch', 'mouse', 'hybrid'])
  scheme: 'keyboard' | 'touch' | 'mouse' | 'hybrid';

  @IsOptional()
  @IsString()
  @MaxLength(80)
  keys?: string;
}

export class UpdateAppDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsIn(APP_CATEGORIES)
  category?: AppCategory;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsGameUrl()
  @MaxLength(2048)
  url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  icon?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  @Type(() => Number)
  rating?: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  trending?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isLocal?: boolean;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ControlsDto)
  controls?: ControlsDto | null;
}
