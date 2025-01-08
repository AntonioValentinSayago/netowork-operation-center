import fs from 'fs'

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDataSource{

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly hightLogsPath = 'logs/logs-high.log';

    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if( !fs.existsSync ( this.logPath) ) fs.mkdirSync( this.logPath );

        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.hightLogsPath,
        ].forEach( path => {
            if(fs.existsSync( path )) return;
            fs.writeFileSync( path, '')
        });
    }

    async saveLog(newlog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify(newlog) }\n `;
        fs.appendFileSync( this.allLogsPath, logAsJson )
        if( newlog.level === LogSeverityLevel.low ) return;
        if( newlog.level === LogSeverityLevel.medium ) {
            fs.appendFileSync( this.mediumLogsPath, logAsJson )
        } else{
            fs.appendFileSync( this.hightLogsPath, logAsJson )
        }
    }
    getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
}