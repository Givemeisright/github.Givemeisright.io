<template>
  <div class="article">
    <h3>联系我</h3>
    <ul>
      <li :style="{ 'list-style': 'none' }" v-for="site in thirdPartySite" :key="site.href">
        <a :href="site.href">{{ site.title }}</a>
      </li>
    </ul>
    <br />
  </div>
</template>

<script>
  import { thirdPartySite, project } from "../config";
  export default {
    name: "About",
    data() {
      return {
        thirdPartySite,
        project,
      };
    },
  };
</script>

<style></style>
