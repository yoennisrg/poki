import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from './app.entity';
import type { AppCategory } from './app.entity';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>
  ) {}

  findAll(): Promise<App[]> {
    return this.appRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<App> {
    const app = await this.appRepository.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`App with id ${id} not found`);
    }
    return app;
  }

  findByCategory(category: AppCategory): Promise<App[]> {
    return this.appRepository.find({ where: { category }, order: { id: 'ASC' } });
  }

  create(partial: Omit<App, 'id' | 'createdAt' | 'updatedAt'>): Promise<App> {
    const app = this.appRepository.create(partial);
    return this.appRepository.save(app);
  }
}
