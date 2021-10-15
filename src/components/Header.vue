<template>
  <div class="header">
    <router-link class="header-logo" :to="{ name: 'Posts' }">梁旭光的个人博客</router-link>
    <!-- <input type="text" class="header-search" v-model="keyword" @keyup.enter="getIssues()" placeholder="输入文章标题或内容，按回车搜索..." /> -->
    <div class="header-dropdown">
      <button @click="setActiveLabel(null)" class="dropdown-button">标签</button>
      <div class="dropdown-content">
        <a v-for="label in labels" :key="label" @click="setActiveLabel(label)">{{ label }}</a>
      </div>
    </div>
    <router-link class="header-about" :to="{ name: 'About' }">关于</router-link>
  </div>
</template>

<script>
  import { getLabels } from "../utils/githubApi";
  import { project } from "../config";
  export default {
    data() {
      return {
        labels: [],
        project,
      };
    },
    async mounted() {
      this.labels = await getLabels();
    },
    methods: {
      async setActiveLabel(label) {
        this.$store.commit("updateActiveLabel", label);
        if (this.$route.path !== "/") this.$router.push("/");
      },
    },
  };
</script>

<style scoped>
  a {
    color: unset;
  }

  a:hover {
    color: #44a340;
    background: unset;
  }

  .header {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eeeeee;
    padding: 10px;
    align-items: center;
    color: #4b595f;
    box-shadow: 0 0.2em 0.6em rgba(0, 0, 0, 0.1);
  }

  .header-logo {
    flex: 5 1 auto;
    margin-left: 40px;
    font-size: 18px;
    text-align: start;
    font-weight: bold;
  }

  .header-search {
    flex: 1 1 auto;
    margin-right: 30px;
    height: 16px;
    padding: 10px;
    border: solid 1px #eeeeee;
    font-size: 14px;
    outline: none;
    border-radius: 50px;
  }
  .header-about {
    flex: 1 1 auto;
  }
  .header-dropdown {
    flex: 1 1 auto;
    margin-left: 20px;
    position: relative;
    display: inline-block;
  }

  .dropdown-button {
    font-size: 14px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #4b595f;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff;
    border: 1px solid #eeeeee;
    border-radius: 0.3em;
    padding: 0.6em 0;
    text-align: left;
  }

  .dropdown-content a {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
  }
  .header-dropdown:hover button {
    color: #44a340;
  }
  .header-dropdown:hover .dropdown-content {
    display: block;
  }
</style>
