import { githubRepo } from "../config";

async function getIssues(query) {
  let label = "";
  if (query && query.label && query.label.trim().length > 0) {
    label = `+label:"${query.label}"`;
  }
  try {
    const data = await fetch(`https://api.github.com/search/issues?q=state:open+repo:${githubRepo}${label}&sort=created&order=desc`).then((res) => res.json());
    return await data.items;
  } catch (error) {
    console.log("GetIssues Failed", error);
  }
}
async function getIssue(id) {
  try {
    return await fetch(`https://api.github.com/repos/${githubRepo}/issues/${id}`).then((res) => res.json());
  } catch (error) {
    console.log("GetIssue Failed", error);
  }
}
async function getLabels() {
  try {
    const data = await fetch(`https://api.github.com/repos/${githubRepo}/labels`).then((res) => res.json());
    return await data.map((label) => label.name);
  } catch (error) {
    console.log("GetLabels Failed", error);
  }
}

export { getIssues, getIssue, getLabels };
