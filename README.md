# blog-directories

blog-directories 是一个为你的博客文章添加目录的 typescript 小插件。

通过获取‘h’标签生成 html 来实现。

## How to use

```
npm i blog-directories
```

```html
<div id="article_content" dangerouslySetInnerHTML={{ __html: this.props.result.valueHtml }}/></div>

<div id="directories_box"></div>
```

```js
import PostDir from "blog-directories";
import "blog-directories/style/default.css";

const postDir = new PostDir({
  postContainer: "article_content",
  hierarchy: ["h2", "h3"],
  directoriesRoot: "directories_box",
});

postDir.render();
```

- **hierarch**

  需要生成目录导航的 H 标签，如['h1','h2','h3','h4','h5']、['h2','h3'],标签不可跳跃。你应根据自己博客实际情况修改~

- **directoriesRoot**

  目录导航组件的容器标签（id 标签），需要自己定义

- **postContainer**

  博客文章内容的父标签(id 标签)

  The parent tag("use id,not class") of the content of a blog post

## Others

样式可以自己修改，目前只是写了个最简单的(我是真的不喜欢写样式。

you can modify styles , I just wrote the simplest one.
