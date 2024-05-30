import { version } from '../../../version';

export function healthStatus() {
    return {
        status: "在线",
        ...version(),
    }
}