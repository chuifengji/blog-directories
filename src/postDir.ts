/***
 * Copyright 2020 Ethan_Lv
 * @author Ethan_Lv ldlandchuifengji@gmail.com
 * @since 2020-07-02
 * @version 0.0.1
 * @desc raw/index.ts Responsible for generating directory structure HTML content。
 */
class PostDir {
  _postContainer: string; //The article root id tag passed in
  _config: Object;
  postRoot: HTMLCollection; //HtmlElement Article root node

  directories: Array<{
    tagName: string;
    value: string;
  }>;

  htmlList: any;
  hierarchy: Array<String>; //The directory level of the export
  constructor(_postContainer: string, _config: Object) {
    this._postContainer = _postContainer;
    this._config = _config;
    this.directories = [];
    this.postRoot = new HTMLCollection();
    this.htmlList = {};
    this.hierarchy = [];
    this.initConfig(this._postContainer, this._config);
    this.generateNodeJson();
  }
  initConfig(_postContainer: string, _config: Object) {
    const nodes = document.getElementById(_postContainer);
    if (null === nodes) {
      //You must first determine if it is null or the compilation will error。
      throw Error("_postContainer is null");
    } else {
      this.postRoot = nodes.children; //The Children attribute retrieves a subset of all tag elements
    }
    if (
      this.hierarchy !==
      (["h1", "h2", "h3", "h4", "h5"] || ["h1", "h2", "h3", "h4"] || [
          "h1",
          "h2",
          "h3",
        ] || ["h1", "h2"] || ["h2", "h3", "h4", "h5"] || ["h2", "h3", "h4"] || [
          "h2",
          "h3",
        ])
    ) {
      throw Error(
        "incorrect tag set! only support to tag 'h5',and check that the order of set is correct?"
      );
    }
  }
  //generateNodeJson
  generateNodeJson() {
    this.dpSearchHtml(this.postRoot);
  }
  //generateHtmlList
  generateHtmlList() {
    let rootNode = `<div class="post_dir_nav">`;
    this.directories.map((item) => {
      rootNode +=
        `<div class="` +
        `post_dir_` +
        item.tagName +
        `"><a href=` +
        item.value +
        `>` +
        item.value +
        `</a></div>`;
    });
    rootNode += `</div>`;
    return rootNode;
  }
  //dpSearchHtml Depth-first traversal of the HTML node
  dpSearchHtml(node: HTMLCollection) {
    for (let i = 0; i < node.length; i++) {
      if (this.hierarchy.includes(node[i].localName)) {
        let obj = {
          tagName: node[i].localName,
          value: node[i].id,
        };
        this.directories.push(obj);
      }
      if (node[i].children !== null) {
        this.dpSearchHtml(node[i].children);
      }
    }
  }
  render() {
    let nodes = this.generateHtmlList();
    console.log(nodes);
  }
}
