//faas/registry/src/db.ts
export default abstract class DB<T>{
    //初始化
    abstract init():void;
    //存人localstorage 的 key
    abstract readonly key: string;
    //从 localStorage 中获取数据
    protected getItems (){
        return localStorage.getItem(this.key);
    }

    //将数存储到localStorage
    protected setItems(data: T){
        localStorage.setItem(this.key,JSON.stringify(data));
    }
    //获取数据,如果数据不存在,则地出NotFound外常
    get():T {
        const data = this.getItems();
        if(!data){
            throw new Deno.errors.NotFound(`${this .key} is not initialized`);
        }
        return JSON.parse(data);
    }
    //设置数据
    protected set(data: T){
        this.setltems(data);
    }
}