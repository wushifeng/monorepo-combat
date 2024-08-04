# Monorepo
全栈Monorepo开发实战(Vue 3+Fastify+Deno+pnpm)  ISBN: 9787111733591

## pnpm
+ pnpm安装： npm install -g pnpm , pnpm的升级 pnpm add -g pnpm
### 项目初始化
+ pnpm init
+ pnpm-workspace.yaml 工作空间

### 相关基础设置
+ pnpm i typescript -wD
+ pnpm i @skimhugo/tsconfig -wD 一份较为严格tsconfig: @skimhugo/tsconfig。这份配置是根据@sindresorhus/tsconfig修改而来。
+ pnpm i @skimhugo/eslint-config -wD 增加 ESLint vscode 插件【dbaeumer.vscode-eslint】
.vscode/settings.json 中设置
这个Monorepo项目，会涉及Deno、Vue和纯TypeScrip项目，
其中Deno项目使用自带的代码风格检查工具，Vue项目除了要添加TypeScrip规则外，还需要配置Vue特有的规则。所以每个模块会配置单独的.eslintrc.json文件，以便进行个性化的配置。

+ pnpm i prettier -wD  .prettierrc.cjs
AlloyTeam/eslint-config-alloy的理念，即ESLint完全关闭格式化功能，格式完全交由Prettier来处理。
因为代码格式化配置一般固定下来以后，通常对代码影响较小，可以在IDE设置保存自动格式化。
通常会以Monorepo子项目作为配置单位，即有多少子项目，就有多少ESLint的配置文件，而Prettier的自定义空间很小，通常只在根工作目录放置一个配置文件.prettierrc，影响全局即可。
Prettier的设计理念是“约定大于配置”，为了实现这个理念，Prettier坚持具备很少的配置项，这样做的好处是减少在代码风格上的争论，让开发者更专注于代码
vscode插件【esbenp.prettier-vscode】
.vscode/settings.json 中设置

### types 全局类型收束项目
packages\types :: pnpm init
@skimhugo/tsconfg已经安装在了项目根工作空间，因此在types项目中并不需要再次安装这个依赖，可直接使用
类型收束常用于解决困难的Bug或避免TypeScript类型打包插件Bug，不使用打包工具进行构建，而其他项目则会使用tsup或Vite等打包工具打包。

packages\types 下执行 pnpm build 
在后续开发时，如果有类型工具的需求，都可以在这个项目中进行创建。完成增加操作后，执行build命令进行类型检查和编译，得到最终的输出结果供其他项目引用。

## Deno
```
Deno是基于V8引擎，使用Rust语言和Tokio库构建的JavaScriptTypeScript安全的运行时，由Node.js最初开发者Ryan Dahl于2018年开发。相比Node.js，Deno拥有很多强大的特性，如安全10、原生支持TypeScript等在设计Deno时，Ryan Dahl解决了很多Node.js的基础设计问题和安全漏洞，包括Node.js与Web标准的不一致、安全性、继续使用GYP、依赖于npm等。Deno同时支持开箱即用TypeScript开发。值得一提的是，Deno是'node'.split(").sort().join(");命令的结果。

https://deno.com/
powsershell "iwr https://deno.land/x/install/install.ps1 -useb | iex"
irm https://deno.land/install.ps1 | iex
https://github.com/denoland/deno/releases/tag/v1.45.4 lib.deno.d.ts

vscode deno插件【denoland.vscode-deno】

deno run https://deno.land/std@0.170.0/examples/welcome.ts

```
### Chapter3
faas\Chapter3 运行 pnpm run run:01

### registry
服务端： pnpm run start 或 deno run --allow-net server.ts
客户端： curl http://localhost:8000/v1/healthcheck

```
vscode查看Deno.* 这样的函数时，需要Enable这个denoland.vscode-deno插件，就不提示语法错
pnpm run start 绑定了端口 8000
faas\registry2\src\router.ts 中注册了服务路由

pnpm run example 启动了/users/search 服务，并注册到上面的8000服务中 http://localhost:8000/v1/registry,服务端口就是这个注册服务给返回的


```