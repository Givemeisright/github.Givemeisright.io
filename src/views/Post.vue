<template>
  <div class="content-layout">
    <aside class="catalog-container">
      <div v-for="catalog in catalogs" :key="catalog.title">
        <a :class="`article-catalog-h${catalog.level}`" :href="`#${catalog.title}`">{{ catalog.title }}</a>
      </div>
    </aside>
    <div class="main-container">
      <a href="#top" id="gotop-btn">
        Up
      </a>
      <article class="article">
        <h1 class="article-title">{{ issue.title }}</h1>
        <p class="article-time">{{ date }}</p>
        <div v-html="renderedMarkdown" class="markdown-body"></div>
        <a :href="issue.html_url">
          <button class="article-comment">Comment</button>
        </a>
      </article>
    </div>
  </div>
</template>

<script>
  import hljs from "highlight.js";
  import marked from "marked";
  import "github-markdown-css/github-markdown.css";
  import "highlight.js/styles/github.css";
  import { getIssue } from "../utils/githubApi";

  export default {
    name: "Post",
    data() {
      return {
        issue: "",
        date: "",
        renderedMarkdown: "",
        catalogs: "",
      };
    },
    async mounted() {
      //fetch data
      if (this.$route.params.issue) {
        this.issue = this.$route.params.issue;
      } else {
        const id = this.$route.path.split("/").pop();
        this.issue = await getIssue(id);
      }
      //display
      this.date = this.issue.created_at.slice(0, 10);
      marked.setOptions({
        highlight: (code) => hljs.highlightAuto(code).value,
      });
      const { htmlContent, catalogs } = this.handleAnchor(this.issue);
      this.renderedMarkdown = htmlContent;
      this.catalogs = catalogs;
    },
    methods: {
      handleAnchor(issue) {
        let htmlContent = marked(issue.body);

        //匹配目录
        const toc = issue.body.match(/#{1,6}\s(.+)/g);
        const catalogs = toc.map((item) => ({
          level: item.split("#").length - 1,
          title: item.replace(/#{1,6}/, "").trim(),
        }));

        //给html中的h加id
        let tocHtml = htmlContent.match(/<(h\d).*?>.*?<\/h\d>/g);
        tocHtml.forEach((item, index) => {
          // let _toc = `<div id='${catalogs[index].title}'>${item} </div>`;
          let _toc = item.replace(/".*"/g, `"${catalogs[index].title}"`);

          htmlContent = htmlContent.replace(item, _toc);
        });
        return { htmlContent, catalogs };
      },
    },
  };
</script>

<style>
  .content-layout {
    display: flex;
  }
  .catalog-container {
    border-right: 1px solid #eeeeee;
    padding: 20px;
    height: 100%;
  }
  .main-container {
    flex-grow: 1;
  }

  /* .article {
    max-width: 750px;
    margin: auto;
    padding: 0 15px 20px 15px;
    line-height: 26px;
    color: #555;
    word-wrap: break-word;
  } */
  .article-title {
    /* margin-top: 30px; */
    color: #ff001f;
    font-size: 22px;
    text-align: center;
    line-height: 30px;
  }
  .article-comment {
    margin: 15px 0 50px 0;
    display: block;
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #999;
    cursor: pointer;
    border-radius: 4px;
    border: 0;
    outline: none;
    background: #ddd;
  }
  .article-time {
    color: #9b9b9b;
    font-size: 14px;
    margin: 5px 0 16px 0;
    text-align: center;
  }
  .article-catalog-h1 {
    font-weight: bold;
  }
  .article-catalog-h2 {
    margin-left: 1em;
  }
  .article-catalog-h3 {
    margin-left: 2em;
  }
  .article-catalog-h4 {
    margin-left: 3em;
  }
  .article-catalog-h5 {
    margin-left: 4em;
  }
  .article-catalog-h6 {
    margin-left: 5em;
  }
  #gotop-btn {
    position: fixed;
    bottom: 50px;
    left: 90vw;
    padding: 0 5px;
    border-radius: 4px;
    border: 1px solid #b7eb8f;
  }
  @media all and (max-width: 640px) {
    .content-layout,
    .catalog-container {
      -webkit-flex-flow: column;
      flex-flow: column;
      flex-direction: column;
    }

    .main-container > article,
    .catalog-container > aside {
      /* 恢复到文档内的自然顺序 */
      -webkit-order: 0;
      order: 0;
    }

    .main-container > aside {
      min-height: 50px;
      max-height: 50px;
    }
  }
</style>
