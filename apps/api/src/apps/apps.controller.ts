import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppsService } from './apps.service';
import type { AppCategory } from './app.entity';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Get()
  findAll(@Query('category') category?: AppCategory) {
    if (category) {
      return this.appsService.findByCategory(category);
    }
    return this.appsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appsService.findOne(Number(id));
  }
}
