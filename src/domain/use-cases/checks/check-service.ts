import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepostory } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepostory,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    async execute(url: string): Promise<boolean> {

        try {
            const req = await fetch(url);
            if (!req.ok) throw new Error("Error on check service");

            const log = new LogEntity({ message: `Service Working`, level: LogSeverityLevel.low, origin: 'check-service.ts' })
            this.logRepository.saveLog(log)
            this.successCallback && this.successCallback()
            return true;
        } catch (error) {
            const errorMessage = `${error}`
            const log = new LogEntity({ message: errorMessage, level: LogSeverityLevel.high, origin: 'check-service.ts' })
            this.logRepository.saveLog(log)
            this.errorCallback && this.errorCallback(errorMessage)
            return false;
        }

    }
}