import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import * as Chance from 'chance';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

describe('AuthController (e2e)', () => {
  let app: any;
  let httpServer: any;

  beforeEach(async () => {
    dotenv.config();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    httpServer = app.getHttpServer();
  });

  it('/auth/register (POST)', () => {
    const chance = new Chance();
    const payload = {
      "name": chance.name(),
      "email": chance.email(),
      "password": chance.string({ length: 10 })
    }

    return request(httpServer)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send(payload)
      .expect(201)
      .then((response) => {
        expect(response.body?.data).toHaveProperty('message'); 
      });
  });

  it('should handle registration and then login successfully', async () => {
    const chance = new Chance();
    const userData = {
      "name": chance.name(),
      "email": chance.email(),
      "password": chance.string({ length: 10 })
    };

    await request(httpServer)
      .post('/auth/register')
      .send(userData)
      .expect(201)
      .then((registerResponse) => {
        expect(registerResponse.body?.data).toHaveProperty('message');
      });

    const loginData = {
      "email": userData.email,
      "password": userData.password,
    };

    await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginData)
      .expect(201)
      .then((loginResponse) => {
        expect(loginResponse.body).toHaveProperty('access_token');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
