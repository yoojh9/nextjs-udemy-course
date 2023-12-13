import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostsFiles = () => {
  return fs.readdirSync(postsDirectory);
};

export const getPostData = (postIdenifier) => {
  const postSlug = postIdenifier.replace(/\.md$/, ""); // removes the file extenstion
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = getPostsFiles();
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });
  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  console.log(allPosts);
  console.log(allPosts[0].isFeatured);
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  console.log(`featuredPost: ${JSON.stringify(featuredPosts)}`);
  return featuredPosts;
};
