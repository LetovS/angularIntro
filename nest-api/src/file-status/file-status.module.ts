import { Module } from '@nestjs/common';
import { FileStatusGateway } from './file-status.gateway';

@Module({
    providers: [FileStatusGateway],
    exports: [FileStatusGateway], // <= это важно
  })
export class FileStatusModule {

}
