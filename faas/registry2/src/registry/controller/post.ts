import { register } from "../service/register.ts";
import {Context,STATUS_CODE} from "../../../deps.ts";

export async function postHandler(ctx: Context) {
    if(!(ctx.request.headers.get('content-type')==='application/json' && ctx.request.hasBody)){
        //只接收JSON格式的content-type,否则返回 415
        ctx.response.status = STATUS_CODE.UnsupportedMediaType;
        return;
    }

    const res=ctx.request.body({type:'json'});
    const req = await res.value;
    const path=req.path;
    const filePath = req.filePath;
    
    if(!path || !filePath ||!Array.isArray(path)){
        //path和 filePath 都是必填项,且path必须是数组,否则返回400
        ctx.response.status = STATUS_CODE.BadRequest;
        return;
    }

    let port;
    try{
        port = register({
            path,
            filePath,
        });
    }catch(e){
        //如果注册失败.返回500
        ctx.response.status = STATUS_CODE.InternalServerError;
        if(e instanceof Deno.errors.AlreadyExists){
            //如果路径已经注册,返回错误信息
            ctx.response.body={
                errMsg: e.message
            };
        }
        return;
    }

    //如果请求通过检测,则返回端口号
    ctx.response.body ={
        port,
    };
}