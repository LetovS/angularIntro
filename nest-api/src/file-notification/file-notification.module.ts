import { Module } from '@nestjs/common';
import { FileStatusModule } from 'src/file-status/file-status.module';
import { FileNotificationService } from './file-notification.service';

@Module({
    imports: [FileStatusModule],
    providers: [FileNotificationService],
    exports: [FileNotificationService]
  })
  
export class FileNotificationModule {}
