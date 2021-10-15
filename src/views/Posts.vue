<template>
  <div class="list">
    <h2 class="category">{{ activeLabel || "博客列表" }}</h2>
    <ul ref="issueList">
      <li class="list-post" v-for="issue in issues" :key="issue.id">
        <div class="list-title">
          <router-link :to="{ name: 'Post', params: { number: issue.number, issue: issue } }">
            {{ issue.title }}
          </router-link>
        </div>
        <span class="list-label" v-for="label in issue.labels" :key="label.id">
          {{ label.name }}
        </span>
        <span class="list-date">{{ issue.created_at.slice(0, 10) }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { getIssues } from "../utils/githubApi";
  import { mapGetters } from "vuex";
  export default {
    name: "Posts",
    data() {
      return {
        totalNum: 0,
        issues: [],
        isNoData: false,
        date: "",
      };
    },
    async mounted() {
      this.issues = await getIssues({ label: this.activeLabel });
    },
    computed: {
      ...mapGetters(["activeLabel"]),
    },
    watch: {
      async activeLabel() {
        this.issues = await getIssues({ label: this.activeLabel });
      },
    },
    methods: {},
  };
</script>

<style scoped>
  li {
    list-style: none;
  }
  .list {
    max-width: 650px;
    margin: auto;
    padding: 0 10px 50px 10px;
  }
  .category {
    color: #666;
    text-align: center;
    font-weight: 300;
    height: 50px;
    line-height: 50px;
    margin-top: 30px;
    border-bottom: 1px solid #e5e5e5;
  }
  /* .list ul:nth-child(1) {
    margin-top: 60px;
    border-top: 1px solid #e5e5e5;
  } */
  .list-post {
    padding: 0 5px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
    overflow: hidden;
  }
  .list-title {
    line-height: 1;
    /* 折行 */
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 450px;
    /* ... 的颜色 */
    color: #44a340;
  }
  .list-title:hover {
    color: #fff;
  }
  .list-label {
    font-size: 12px;
    color: #999;
    border-radius: 4px;
    border: 1px solid #b7eb8f;
    padding: 0 7px;
    margin-left: 8px;
  }
  .list-date {
    color: #999;
    float: right;
  }
</style>
