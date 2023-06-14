# @alife/i18n

 ## Demo
 ```
 import I18n from '@alife/i18n';
 const i18n = new I18n({
     lang:"zh-CN",
     langpacks:{
         "zh-CN":{
             "hello.word":"Hello world!"
         }
     }
 })
 i18n.get("hello.word"); //Hello world!
 ```

 ## API
 
### constructor - params<{langpacks?,lang?,defaultLang?,namesplace?}>
- langpacks?:<{[lang:string]:{[key:string]:string}}> 语言包（两级结构，一级未语言、二级未文案map）
- lang?:string="en-US", 当前所使用的语言包，获取文案时，使用默认使用次文案包
- defaultLang?:string ,兜底语言，设置defaultLang，当使用get获取文案，且未明确指定使用哪种语言时如果获取不到当前语言文案，则会尝试查找defaultLang指定的文案
- namespace?:string, 文案namespace。 当指定了namespace的时候，文案会以 namespace+"."+key 格式存储

### Method
- updateLangpacks(lang:string,langpacks:Object>):void
- updateLangpacks(lang:string,langpacks:Object>,keyIncludeNamespace):void
- isExist(key)
- isExist(key,lang)
- get(key:string)
- get(key:string,lang:string)
- get(key:string,data:Object|Array)
- get(key:string,lang:string,data:Object|Array)