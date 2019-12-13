/**
 * Logger.ts
 * created by Jacob on 2017-06-20
 */

namespace adapter {
    export enum LogerLevel {
        DEBUG = 0,
        INFO,
        WARN,
        ERROR
    }

    export class Logger {
        private constructor() {
        }

        static debug(message: string, ...optionalParams: any[]): void {
            console.debug(message, ...optionalParams);
        }

        static info(message: string, ...optionalParams: any[]): void {
            console.info(message, ...optionalParams);
        }

        static warn(message: string, ...optionalParams: any[]): void {
            console.warn(message, ...optionalParams);
        }

        static error(message: string, ...optionalParams: any[]): void {
            console.error(message, ...optionalParams);
        }
    }

}