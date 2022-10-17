import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication }    from '@nestjs/common';
import * as request            from 'supertest';
import { Repository }          from 'typeorm';
import { AppModule }           from '../src/app.module';
import { appConfigure }        from '../src/app.configure';
import { Building }            from '../src/project/entities/building.entity';
import { CreateWorkFrontDto }  from '../src/project/dtos/create-work-front.dto';
import { WorkFront }           from '../src/project/entities/work-front.entity';
import exp                     from 'constants';

describe('Project Module (e2e)', () => {
  let app: INestApplication;
  let buildingRepository: Repository<Building>;
  let workFrontRepository: Repository<WorkFront>;
  let buildingId: number;

  const truncate = async (): Promise<void> => {
    await buildingRepository.query('TRUNCATE TABLE building CASCADE');
    await workFrontRepository.query('TRUNCATE TABLE work_front CASCADE');
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app = appConfigure(app);

    await app.init();

    buildingRepository  = moduleFixture.get('BuildingRepository');
    workFrontRepository = moduleFixture.get('WorkFrontRepository');

    await truncate();
  });

  it('Should be able to create new buildings', async () => {
    const building = { name: 'Empire States Building', floorCount: 16 };
    return request(app.getHttpServer())
      .post('/building')
      .send(building)
      .expect(201)
      .then((res) => {
        expect(res.body.id).toBeDefined();
        expect(res.body.name).toBe(building.name);
        expect(res.body.floorCount).toBe(building.floorCount);

        buildingId = res.body.id;
      });
  });

  it('Should be able to create work fronts', async () => {
    const workFronts: CreateWorkFrontDto[] = [
      { name: 'Hydraulics' },
      { name: 'Electrics' },
    ];

    Promise.all(
        workFronts.map(wF => request(app.getHttpServer())
          .post('/work-front')
          .send(wF)
          .expect(201)),
      )
      .then((res) => {
        expect(res[0].body.name).toBe(workFronts[0].name);
        expect(res[1].body.name).toBe(workFronts[1].name);
      });
  });

  afterAll(async () => {
    await truncate();
  });

});