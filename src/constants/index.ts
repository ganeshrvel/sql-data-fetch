import { env } from 'process';

export class Constants {
    static IS_DEV = env.NODE_ENV !== 'production';
}
