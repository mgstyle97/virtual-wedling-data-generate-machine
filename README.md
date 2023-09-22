# Virtual Machine to generate welding data

## 개요

스마트 팩토리에서 발생하는 가상의 로봇 용접기 데이터 생성을 위한 가상 머신 프로젝트
<br/><br/>

## 설명

이 프로젝트는 논문에 필요한 가상의 데이터를 생성하는 프로젝트이며, 다음으로 구성된다.

### 구성
* 용접 불량 예측을 위한 로봇 용접기 데이터([참고](https://www.kamp-ai.kr/aidataDetail?AI_SEARCH=&page=1&DATASET_SEQ=5&EQUIP_SEL=&GUBUN_SEL=&FILE_TYPE_SEL=&WDATE_SEL=))
* 용접기 데이터 전송 MQTT 기반 마이크로서비스 프로젝트([Nest.js 마이크로서비스](https://docs.nestjs.com/microservices/mqtt))

### 환경
* OS: macOS Ventura 13.5.2(22G91)
* Node: 18.18.0(LTS)
* Application: Nest.js

<br/>

### Set up
```bash
# Clone repository
$ git clone git@github.com:mgstyle97/virtual-wedling-data-generate-machine.git

# Change directory
$ cd virtual-wedling-data-generate-machine

# NPM install
$ npm i
```

<br/>

### Test
```bash
# Build
$ npm run build

# Unit test
$ npm run test

# Integration test
$ npm run test:e2e
```

<br/>

### Running the app
```bash
# Build
$ npm run build

# Running in development env
npm run start:dev

# Running in production env
npm run start:prod
```

<br/>

## Status
* [History](https://github.com/mgstyle97/virtual-wedling-data-generate-machine/blob/main/CHANGELOG)
* [Pull requests](https://github.com/mgstyle97/virtual-wedling-data-generate-machine/pulls)
* [Issues](https://github.com/mgstyle97/virtual-wedling-data-generate-machine/issues)

<br/>

## Refereneces

* Data: [인공지능 중소벤처 제조 플랫폼](https://www.kamp-ai.kr/main)