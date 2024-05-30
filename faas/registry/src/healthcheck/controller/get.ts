import { Context } from '../../../deps';
import { healthStatus} from "./service/health-status";

export function getHandler(ctx: Context){
    ctx.response.body = {
      ...healthStatus(),
    };
}