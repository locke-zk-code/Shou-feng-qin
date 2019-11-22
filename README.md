# shouFengQin
手风琴插件

# 使用前提条件
&nbsp;&nbsp;&nbsp;&nbsp;下载 Qin.js 代码，在你的 main.js 文件中使用 ES6 import 语法导入改文件。Qin.js 文件导出一个默认的函数

## 函数的使用方式
&nbsp;&nbsp;&nbsp;&nbsp;函数接受一个对象作为参数

## 对象的参数列表
&nbsp;&nbsp;&nbsp;&nbsp;el: 指定一个根元素，让其作为手风琴的容器，必选属性。<br />

&nbsp;&nbsp;&nbsp;&nbsp;imgs: 该属性是一个以展示图片的路径所组成的数组，必选属性。<br />

&nbsp;&nbsp;&nbsp;&nbsp;width: 指定被展示图片的宽度，必选属性。<br />

&nbsp;&nbsp;&nbsp;&nbsp;urls: 该属性是一个数组，保存着当点击每一扇琴所跳转的链接，必选属性。<br />

&nbsp;&nbsp;&nbsp;&nbsp;tag：每一扇琴的容器是什么元素，默认是 a 元素。<br />

&nbsp;&nbsp;&nbsp;&nbsp;minWidth: 未被展示图片的宽度，默认是 50px。<br />

&nbsp;&nbsp;&nbsp;&nbsp;time: 每一扇琴的自动轮播时间，默认是 2000ms。
