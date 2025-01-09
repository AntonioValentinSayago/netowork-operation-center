import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-impl.repository";
import { CronService } from "./cron/cron-service";

const fileSystemlogRepository = new LogRepositoryImpl( 
    new FileSystemDatasource()
 )

export class Server {
    static start() {
        console.log('Server started....');
        CronService.createJob(
            '*/5 * * * * *', // cronTime
            () => {
                // const date = new Date()
                // console.log(`You will see this message ${date} second`);
                // --> const url = '';
                new CheckService(
                    fileSystemlogRepository,
                    () => console.log('success'),
                    ( error ) => console.log(error)
                ).execute( 'https://www.youtube.com/' )
            }
        )
    }
}