import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { App } from './app.entity';
import type { AppCategory } from './app.entity';

export interface PaginatedAppsResult {
  data: App[];
  total: number;
  limit: number;
  offset: number;
}

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>
  ) {}

  async findAll(options: {
    category?: AppCategory;
    limit: number;
    offset: number;
  }): Promise<PaginatedAppsResult> {
    const where: FindManyOptions<App>['where'] = options.category
      ? { category: options.category }
      : {};

    const [data, total] = await this.appRepository.findAndCount({
      where,
      order: { id: 'ASC' },
      take: options.limit,
      skip: options.offset,
    });

    return {
      data,
      total,
      limit: options.limit,
      offset: options.offset,
    };
  }

  async findOne(id: number): Promise<App> {
    const app = await this.appRepository.findOne({ where: { id } });
    if (!app) {
      throw new NotFoundException(`App with id ${id} not found`);
    }
    return app;
  }

  async create(
    partial: Partial<Omit<App, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<App> {
    const app = this.appRepository.create(partial);
    return this.appRepository.save(app);
  }

  async update(
    id: number,
    partial: Omit<Partial<App>, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<App> {
    const app = await this.findOne(id);
    this.appRepository.merge(app, partial);
    return this.appRepository.save(app);
  }

  async remove(id: number): Promise<void> {
    const app = await this.findOne(id);
    await this.appRepository.remove(app);
  }

  async count(): Promise<number> {
    return this.appRepository.count();
  }
}
