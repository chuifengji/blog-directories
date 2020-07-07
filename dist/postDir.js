"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/***
 * Copyright 2020 Ethan_Lv
 * @author Ethan_Lv ldlandchuifengji@gmail.com
 * @since 2020-07-02
 * @version 0.0.1
 * @desc raw/index.ts Responsible for generating directory structure HTML content。
 */
var PostDir = /** @class */ (function () {
  function PostDir(_config) {
    this.postContainer = _config.postContainer;
    this._config = _config;
    this.directories = [];
    this.postRoot = {};
    _config.hasOwnProperty("directoriesRoot") &&
    _config.directoriesRoot.replace(/\s+/g, "") !== ""
      ? (this.directoriesRoot = _config.directoriesRoot)
      : (this.directoriesRoot = "undefiend");
    this.htmlList = {};
    this.hierarchy = [];
    this.initConfig(this._config);
    this.generateNodeJson();
  }
  PostDir.prototype.initConfig = function (_config) {
    var nodes = document.getElementById(this.postContainer);
    this.hierarchy = _config.hierarchy;
    if (null === nodes) {
      //You must first determine if it is null or the compilation will error。
      throw Error("postContainer is null");
    } else {
      this.postRoot = nodes.children; //The Children attribute retrieves a subset of all tag elements
    }
    if (
      this.hierarchy ===
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
  };
  //generateNodeJson
  PostDir.prototype.generateNodeJson = function () {
    this.dpSearchHtml(this.postRoot);
  };
  //generateHtmlList
  PostDir.prototype.generateHtmlList = function () {
    var _this = this;
    var rootNode = '<div class="post_dir_nav">';
    this.directories.map(function (item) {
      var level = 0;
      _this.hierarchy.map(function (value, index, arr) {
        if (value === item.tagName) {
          level = index;
        }
      });
      rootNode +=
        '<div class="' +
        "post_dir_level" +
        level +
        '"><a href=' +
        '"#' +
        item.value +
        '"' +
        ">" +
        item.value +
        "</a></div>";
    });
    rootNode += "</div>";
    return rootNode;
  };
  //dpSearchHtml Depth-first traversal of the HTML node
  PostDir.prototype.dpSearchHtml = function (node) {
    for (var i = 0; i < node.length; i++) {
      if (this.hierarchy.includes(node[i].localName)) {
        var obj = {
          tagName: node[i].localName,
          value: node[i].id,
        };
        this.directories.push(obj);
      }
      if (node[i].children !== null) {
        this.dpSearchHtml(node[i].children);
      }
    }
  };
  PostDir.prototype.render = function () {
    var nodes = this.generateHtmlList(),
      outBox = document.createElement("div");
    try {
      var directoriesRoot = document.getElementById(this.directoriesRoot);
      if (directoriesRoot !== null) {
        outBox.className = "post_dir_nav_outBox";
        outBox.innerHTML = nodes;
        directoriesRoot.innerHTML = outBox.outerHTML;
      } else {
        throw Error("Invalid external tag!");
      }
    } catch (e) {
      throw Error("'directoriesRoot' is not being used correctly!");
    }
  };
  return PostDir;
})();
exports.default = PostDir;
