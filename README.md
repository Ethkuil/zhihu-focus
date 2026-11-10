# zhihu-focus

一个轻量的 Tampermonkey 用户脚本：将知乎首页变成简洁的搜索入口，彻底隐藏推荐信息流，保留主动浏览与创作所需的功能。

## 功能

### 首页

隐藏原有页面内容，只保留知乎 Logo 和居中的大搜索框，模仿搜索引擎搜索框。

搜索框下方提供三个快捷入口：

- 关注页
- 创作：仅保留「发想法」、「写文章」
- 我的主页

<img width="1369" height="808" alt="image" src="https://github.com/user-attachments/assets/088cc1aa-3908-4a42-8229-cbd70b545b04" />

### 关注页

- 顶部 header 隐藏搜索框左侧的内容，包括知乎 Logo 和导航。
- 隐藏热搜卡片 HotSearchCard。

<img width="2059" height="184" alt="image" src="https://github.com/user-attachments/assets/c00c6c07-557d-4684-bc40-2e4c72172478" />

## 已知限制

- 首页搜索框不提供搜索建议。
