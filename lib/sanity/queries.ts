export const blogPostsQuery = (language: string = 'en') => `
  *[_type == "blog" && defined(${language}.title) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    blogId,
    "title": ${language}.title,
    "slug": ${language}.slug.current,
    "excerpt": ${language}.excerpt,
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

export const blogPostBySlugQuery = (language: string = 'en') => `
  *[_type == "blog" && (
    en.slug.current == $slug ||
    br.slug.current == $slug ||
    pl.slug.current == $slug ||
    de.slug.current == $slug ||
    es.slug.current == $slug
  ) && !(_id in path("drafts.**"))][0] {
    _id,
    blogId,
    "title": ${language}.title,
    "slug": ${language}.slug.current,
    "excerpt": ${language}.excerpt,
    "body": ${language}.body,
    "metaTitle": ${language}.metaTitle,
    "metaDescription": ${language}.metaDescription,
    "keywords": ${language}.keywords,
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
    blogId,
    "enSlug": en.slug.current,
    "brSlug": br.slug.current,
    "plSlug": pl.slug.current,
    "deSlug": de.slug.current,
    "esSlug": es.slug.current
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
      "title": en.title,
      "slug": en.slug.current,
      publishedAt,
      "image": featuredImage.asset->url
    }
  }
`;
