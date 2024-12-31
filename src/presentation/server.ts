import { CronService } from "./cron/cron-service";

export class Server {
    static start() {
        console.log('Server started....');
        CronService.createJob(
            '*/5 * * * * *', // cronTime
            () => {
                const date = new Date()
                console.log(`You will see this message ${date} second`);
            }
        )
    }
}