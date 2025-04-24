import { Injectable } from '@nestjs/common';
import { FileStatusGateway } from 'src/file-status/file-status.gateway';

@Injectable()
export class FileNotificationService {
    constructor(private readonly gateway: FileStatusGateway) {}

    processFile(userId: number, fileId: number, newStatus: string) {
            
        this.gateway.notifyUser(userId, { fileId, newStatus });
    }
}
