import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepostory } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepostory {

    constructor(
        private readonly LogDataSource: LogDataSource,
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        return this.LogDataSource.saveLog( log )
    }
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.LogDataSource.getLog( severityLevel )
    }
    
} 