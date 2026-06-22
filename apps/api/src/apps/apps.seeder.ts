import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App, AppCategory } from './app.entity';

const SEED_APPS: Array<
  Omit<App, 'id' | 'createdAt' | 'updatedAt'> & { category: AppCategory }
> = [
  {
    title: 'HexGL',
    description:
      'Compite en una carrera futurista anti-gravedad a toda velocidad por circuitos de neón.',
    category: 'carreras',
    url: 'https://hexgl.bkcore.com/',
    icon: '🏎️',
    rating: 4.7,
    trending: true,
    isLocal: false,
    controls: { scheme: 'keyboard', keys: '← →' },
  },
  {
    title: 'Super Mario Bros',
    description:
      'Salta, esquiva enemigos y recorre el primer nivel clásico de este plataformas retro.',
    category: 'aventura',
    url: 'https://martindrapeau.github.io/backbone-game-engine/super-mario-bros/index.html',
    icon: '🍄',
    rating: 4.5,
    trending: true,
    isLocal: false,
    controls: { scheme: 'keyboard', keys: '← → · Espacio' },
  },
  {
    title: 'Hextris',
    description:
      'Gira el hexágono y encaja colores en este adictivo puzzle inspirado en Tetris.',
    category: 'puzzle',
    url: 'https://hextris.io/',
    icon: '🧩',
    rating: 4.3,
    trending: true,
    isLocal: false,
    controls: { scheme: 'hybrid', keys: '← →' },
  },
  {
    title: 'SkiFree',
    description:
      'Esquía cuesta abajo, esquiva obstáculos y trata de no ser atrapado por el yeti.',
    category: 'deportes',
    url: 'https://basicallydan.github.io/skifree.js/',
    icon: '⛷️',
    rating: 4.2,
    trending: false,
    isLocal: false,
    controls: { scheme: 'keyboard', keys: '← → ↑ ↓' },
  },
  {
    title: 'Alien Invasion',
    description:
      'Defiende la Tierra de oleadas de alienígenas en este shooter arcade de desplazamiento lateral.',
    category: 'acción',
    url: 'https://cykod.github.io/AlienInvasion/',
    icon: '👾',
    rating: 4.6,
    trending: true,
    isLocal: false,
    controls: { scheme: 'keyboard', keys: '← → · Espacio' },
  },
  {
    title: '2048',
    description:
      'Desliza los números y combina fichas hasta alcanzar el mítico 2048.',
    category: 'casual',
    url: 'https://gabrielecirulli.github.io/2048/',
    icon: '🔢',
    rating: 4.1,
    trending: false,
    isLocal: false,
    controls: { scheme: 'hybrid', keys: '← → ↑ ↓' },
  },
  {
    title: 'Clumsy Bird',
    description:
      'Vuela entre tuberías en este divertido clon de Flappy Bird y bate tu propio récord.',
    category: 'acción',
    url: 'https://ellisonleao.github.io/clumsy-bird/',
    icon: '🐦',
    rating: 4.0,
    trending: false,
    isLocal: false,
    controls: { scheme: 'hybrid', keys: 'Espacio / toque' },
  },
  {
    title: 'A Dark Room',
    description:
      'Descubre una historia oscura en este juego de texto, exploración e incremental.',
    category: 'casual',
    url: 'https://adarkroom.doublespeakgames.com/',
    icon: '🕯️',
    rating: 4.4,
    trending: false,
    isLocal: false,
    controls: { scheme: 'mouse', keys: 'Clic' },
  },
  {
    title: 'Trigger Rally',
    description:
      'Conduce a toda velocidad por pistas de rally arcade en este juego de conducción web.',
    category: 'carreras',
    url: 'https://codeartemis.github.io/TriggerRally/server/public/',
    icon: '🏁',
    rating: 4.3,
    trending: false,
    isLocal: false,
    controls: { scheme: 'keyboard', keys: '← → ↑ ↓' },
  },
  {
    title: 'The House',
    description:
      'Explora una casa misteriosa, resuelve acertijos y encuentra la salida en este point-and-click.',
    category: 'aventura',
    url: 'https://the-house.arturkot.pl/',
    icon: '🏚️',
    rating: 4.5,
    trending: false,
    isLocal: false,
    controls: { scheme: 'mouse', keys: 'Clic' },
  },
  {
    title: 'Sudoku Daily',
    description:
      'Disfruta de sudokus con diferentes niveles de dificultad en una interfaz limpia.',
    category: 'puzzle',
    url: 'https://baruchel.insomnia247.nl/sudoku-js/sudoku.html',
    icon: '🧮',
    rating: 4.2,
    trending: false,
    isLocal: false,
    controls: { scheme: 'mouse', keys: 'Clic / toque' },
  },
  {
    title: 'Fluid Table Tennis',
    description:
      'Juega ping-pong sobre una simulación de fluidos a todo color y reacción rápida.',
    category: 'deportes',
    url: 'https://anirudhjoshi.github.io/fluid_table_tennis/',
    icon: '🏓',
    rating: 3.9,
    trending: false,
    isLocal: false,
    controls: { scheme: 'mouse', keys: 'Mueve el ratón' },
  },
  {
    title: 'Retro Snake',
    description:
      'El clásico juego de la serpiente. Come, crece y evita chocar contigo mismo.',
    category: 'casual',
    url: '/games/snake/index.html',
    icon: '🐍',
    rating: 4.8,
    trending: true,
    isLocal: true,
    controls: { scheme: 'hybrid', keys: 'Flechas o desliza' },
  },
];

@Injectable()
export class AppsSeeder implements OnModuleInit {
  private readonly logger = new Logger(AppsSeeder.name);

  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>
  ) {}

  async onModuleInit(): Promise<void> {
    const count = await this.appRepository.count();
    if (count > 0) {
      this.logger.log(`Database already seeded (${count} apps found). Skipping.`);
      return;
    }

    await this.appRepository.manager.transaction(async (manager) => {
      await manager.save(App, SEED_APPS);
    });

    this.logger.log(`Seeded ${SEED_APPS.length} apps into the catalog.`);
  }
}
