module.exports = {
    // 一行最多 100 字符
    printWidth : 100,
    // 使用两个空格缩进
    tabWidth : 2,
    //不使用缩进符。而使用空格
    useTabs:false,
    //行尾需要有分号
    semi:true,
    //使用单引号
    singleQuote:true,
    //对象的key 仅在必要时用引号
    quoteProps: "as-needed",
    //jsx不使用单引号,面使用双引号
    jsxSingleQuote: false,
    //末尾需要逗号
    trailingComma: "a11",
    //大括号内的首尾需要空格
    bracketSpacing:true,
    //jsx标签的反尖括号需要换行
    jsxBracketSameline:false,
    //简头函数,只有一个参数时也需要括号
    arrowParens:"always",
    //每个文件格式化的范国是文件的全部内容
    rangestart: 0,
    rangeEnd: Infinity,
    //不需要(false)写文件开头的@prettier
    requirePragma:false,
    //不需要(false)自动在文件开头捕人@prettier
    insertPragma: false,
    //使用默认的折行标准
    proseWrap:"preserve",
    //根据显示样式决定 HTML要不要折行
    htmlWhitespaceSensitivity:"css",
    //换行符使用lf
    endOfline: "lf",
    //vue 文件 script 和 style 标签缩进
    vueIndentScriptAndStyle:false,
    //被引号包裹的代码不进行格式化
    embeddedLanguageFormatting:"off",
}