/***
 * Copyright 2020 Ethan_Lv
 * @author Ethan_Lv ldlandchuifengji@gmail.com
 * @since 2020-07-02
 * @version 0.0.1
 * @desc raw/index.ts Responsible for generating directory structure HTML content。
 */
export class PostDir {
    constructor(_config) {
        this.postContainer = _config.postContainer;
        this._config = _config;
        this.directories = [];
        this.postRoot = {};
        this.directoriesRoot = _config.directoriesRoot;
        this.htmlList = {};
        this.hierarchy = [];
        this.initConfig(this._config);
        this.generateNodeJson();
    }
    initConfig(_config) {
        const nodes = document.getElementById(this.postContainer);
        this.hierarchy = _config.hierarchy;
        if (null === nodes) {
            //You must first determine if it is null or the compilation will error。
            throw Error("postContainer is null");
        }
        else {
            this.postRoot = nodes.children; //The Children attribute retrieves a subset of all tag elements
        }
        if (this.hierarchy ===
            (["h1", "h2", "h3", "h4", "h5"] || ["h1", "h2", "h3", "h4"] || [
                "h1",
                "h2",
                "h3",
            ] || ["h1", "h2"] || ["h2", "h3", "h4", "h5"] || ["h2", "h3", "h4"] || [
                "h2",
                "h3",
            ])) {
            throw Error("incorrect tag set! only support to tag 'h5',and check that the order of set is correct?");
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
            let level = 0;
            this.hierarchy.map((value, index, arr) => {
                if (value === item.tagName) {
                    level = index;
                }
            });
            rootNode +=
                `<div class="` +
                    `post_dir_level` +
                    level +
                    `"><a href=` +
                    `"#` +
                    item.value +
                    `"` +
                    `>` +
                    item.value +
                    `</a></div>`;
        });
        rootNode += `</div>`;
        return rootNode;
    }
    //dpSearchHtml Depth-first traversal of the HTML node
    dpSearchHtml(node) {
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
        let nodes = this.generateHtmlList(), directoriesRoot = document.getElementById(this.directoriesRoot);
        if (directoriesRoot !== null) {
            let outBox = document.createElement("div");
            outBox.className = "post_dir_nav_outBox";
            outBox.innerHTML = nodes;
            document.body.appendChild(outBox);
        }
        else {
            throw Error("Invalid external tag!");
        }
    }
}
