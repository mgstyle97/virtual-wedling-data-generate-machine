import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import mqttClientGenerator from '@main/mqtt-client.generator';

describe('MQTT Client Generator', () => {
  let config: ConfigService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `config/.env.${process.env.NODE_ENV}`,
        }),
      ],
    }).compile();

    config = app.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(config).toBeDefined();
  });

  it('테스트: 환경 설정 파일을 통한 MQTT Client 생성 확인', () => {
    // given
    const expectedLength = config.get('CLIENT_NUM');

    // when
    const clients = mqttClientGenerator(config);

    // then
    expect(clients.length).toEqual(Number.parseInt(expectedLength));
  });
});
