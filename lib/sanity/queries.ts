export const blogPostsQuery = () => `
  *[_type == "blog" && defined(title) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    publishedAt,
    author->{
      name,
      "image": image.asset->url
    },
    categories[]->{ 
      title 
    }
  }
`;

export const blogPostBySlugQuery = () => `
  *[_type == "blog" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    metaTitle,
    metaDescription,
    keywords,
    schemaMarkup,
    "featuredImage": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt,
    publishedAt,
    author->{
      name,
      bio,
      "image": image.asset->url
    },
    categories[]->{ 
      title 
    }
  }
`;

export const allBlogSlugsQuery = `
  *[_type == "blog" && !(_id in path("drafts.**"))] {
    _id,
    "slug": slug.current
  }
`;

export const authorBySlugQuery = `
  *[_type == "author" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    "image": image.asset->url,
    tagline,
    bio,
    social,
    "calculators": *[_type == "calculator" && references(^._id)] {
      title,
      calculatorId,
      ratingTotal,
      ratingCount
    },
    "posts": *[_type == "blog" && references(^._id)] {
      title,
      "slug": slug.current,
      publishedAt,
      "image": featuredImage.asset->url
    }
  }
`;
