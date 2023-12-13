import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkDown from "react-markdown";
import Image from "next/image";

const PostContent = (props) => {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  const customRenderers = {
    img(image) {
      return <Image src={image.src} alt={image.alt} width={600} height={300} />;
    },
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].type === "image") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image src={image.src} alt={image.alt} width={600} height={300} />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkDown components={customRenderers}>{post.content}</ReactMarkDown>
    </article>
  );
};

export default PostContent;
