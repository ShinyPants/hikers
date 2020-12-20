# hikers

## 安装组件
```
npm install
```

### 编译并热更新
```
npm run serve
```

### 生产环境打包
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 自定义设置
见 [Configuration Reference](https://cli.vuejs.org/config/).



# 笔记

## 命令

### 安装vue-router

```shell
npm install --save vue-router
```

### 安装Element-UI

```
npm npm i element-ui -S
```

# 问题

## 待解决

## 已解决

# 组件

## Bar

### PicBar

功能：以图标显示导航菜单，点击后发出事件，告诉父组件切换页面。

外观：可自定义图片大小，无层级显示，平均分布，父组件能够自定义外观，在选中后可以切换为指定的样式。

props：

| 名称     | 功能      | 类型                             | 默认值                   |
| -------- | --------- | -------------------------------- | ------------------------ |
| pics     | 图片url   | [{defaultPic:Str,selectPic:Str}] | 无                       |
| picSize  | 图片大小 | Number                           | 50 |
| picFit   | 填充模式  | fill,contain,cover,none          | fill                     |
| backStyle | 背景style类 | style | 无 |
| itemStyle | 选项style类 | style | 无 |

事件：

| 名称     | 功能      | 参数                             |
| -------- | --------- | ------------------- |
| change | 重新选择的项 | 索引值 |
| again | 又点了一下 | 索引值 |

### TextBar

功能：以文字显示导航菜单，点击后发出事件，告诉父组件切换页面；并可将选中项样式切换为指定样式。

外观：默认居中，平均分布，父组件能够自定义外观，在选中后有指定的样式显示。

props：

| 名称      | 功能          | 类型      | 默认值 |
| --------- | ------------- | --------- | ------ |
| titles    | 标题名称      | [Str,Str] | 无     |
| backStyle | 背景style类   | style     | 无     |
| itemStyle | 选项style类   | style     | 无     |
| slctStyle | 选中项style类 | style     | 无     |

事件：

| 名称   | 功能         | 参数   |
| ------ | ------------ | ------ |
| change | 重新选择的项 | 索引值 |
| again  | 又点了一下   | 索引值 |

# 页面