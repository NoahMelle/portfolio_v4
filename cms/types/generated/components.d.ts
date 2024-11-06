import type { Struct, Schema } from '@strapi/strapi';

export interface UtilsString extends Struct.ComponentSchema {
  collectionName: 'components_utils_strings';
  info: {
    displayName: 'String';
  };
  attributes: {
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface UtilsIconLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_icon_links';
  info: {
    displayName: 'Icon Link';
    description: '';
  };
  attributes: {
    url: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    alt: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoOpenGraphTags extends Struct.ComponentSchema {
  collectionName: 'components_seo_open_graph_tags';
  info: {
    displayName: 'Open Graph Tags';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    type: Schema.Attribute.Enumeration<
      [
        'website',
        'article',
        'video.movie',
        'video.episode',
        'video.tv_show',
        'video.other',
        'music.song',
        'music.album',
        'music.playlist',
        'music.radio_station',
        'book',
        'profile',
        'product',
      ]
    >;
  };
}

export interface SeoMetadata extends Struct.ComponentSchema {
  collectionName: 'components_seo_metadata';
  info: {
    displayName: 'Metadata';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    keywords: Schema.Attribute.Component<'utils.string', true>;
    ogTags: Schema.Attribute.Component<'seo.open-graph-tags', false>;
  };
}

export interface ComponentsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_components_testimonials';
  info: {
    displayName: 'Testimonials';
  };
  attributes: {
    testimonialHeading: Schema.Attribute.String;
  };
}

export interface ComponentsTechStack extends Struct.ComponentSchema {
  collectionName: 'components_components_tech_stacks';
  info: {
    displayName: 'techStack';
    description: '';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    techStackSkills: Schema.Attribute.Relation<'oneToMany', 'api::skill.skill'>;
  };
}

export interface ComponentsSkills extends Struct.ComponentSchema {
  collectionName: 'components_components_skills';
  info: {
    displayName: 'Skills';
    description: '';
  };
  attributes: {
    skillText: Schema.Attribute.RichText & Schema.Attribute.Required;
    techStack: Schema.Attribute.Component<'components.tech-stack', false>;
    skillsHeading: Schema.Attribute.String;
  };
}

export interface ComponentsMyInfo extends Struct.ComponentSchema {
  collectionName: 'components_components_my_infos';
  info: {
    displayName: 'My Info';
    description: '';
  };
  attributes: {
    dateOfBirth: Schema.Attribute.Date;
    startedProgramming: Schema.Attribute.Date;
    socialLinks: Schema.Attribute.Component<'utils.icon-link', true>;
  };
}

export interface ComponentsMarquee extends Struct.ComponentSchema {
  collectionName: 'components_components_marquees';
  info: {
    displayName: 'Marquee';
  };
  attributes: {
    text: Schema.Attribute.Component<'utils.string', true>;
  };
}

export interface ComponentsLinkArray extends Struct.ComponentSchema {
  collectionName: 'components_components_link_arrays';
  info: {
    displayName: 'Link Array';
    description: '';
  };
  attributes: {
    header: Schema.Attribute.String;
    links: Schema.Attribute.Component<'utils.link', true>;
  };
}

export interface ComponentsHeading extends Struct.ComponentSchema {
  collectionName: 'components_components_headings';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
    ctaButton: Schema.Attribute.Component<'utils.link', false>;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ComponentsExperience extends Struct.ComponentSchema {
  collectionName: 'components_components_experiences';
  info: {
    displayName: 'Experience';
    icon: '';
  };
  attributes: {
    heading: Schema.Attribute.String;
    experienceTexts: Schema.Attribute.Component<
      'components.experience-text',
      true
    >;
  };
}

export interface ComponentsExperienceText extends Struct.ComponentSchema {
  collectionName: 'components_components_experience_texts';
  info: {
    displayName: 'Experience Text';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    content: Schema.Attribute.Text;
    startingDate: Schema.Attribute.Date;
    endingDate: Schema.Attribute.Date;
  };
}

export interface ComponentsAboutMe extends Struct.ComponentSchema {
  collectionName: 'components_components_about_mes';
  info: {
    displayName: 'About Me';
    description: '';
  };
  attributes: {
    iconLinks: Schema.Attribute.Component<'utils.icon-link', true>;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.RichText;
    quickInfo: Schema.Attribute.Component<'components.about-me-info', true>;
  };
}

export interface ComponentsAboutMeText extends Struct.ComponentSchema {
  collectionName: 'components_components_about_me_texts';
  info: {
    displayName: 'About Me Text';
    description: '';
  };
  attributes: {
    text: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'>;
  };
}

export interface ComponentsAboutMeInfo extends Struct.ComponentSchema {
  collectionName: 'components_components_about_me_infos';
  info: {
    displayName: 'About Me Info';
    icon: '';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    content: Schema.Attribute.String;
    alt: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'utils.string': UtilsString;
      'utils.link': UtilsLink;
      'utils.icon-link': UtilsIconLink;
      'seo.open-graph-tags': SeoOpenGraphTags;
      'seo.metadata': SeoMetadata;
      'components.testimonials': ComponentsTestimonials;
      'components.tech-stack': ComponentsTechStack;
      'components.skills': ComponentsSkills;
      'components.my-info': ComponentsMyInfo;
      'components.marquee': ComponentsMarquee;
      'components.link-array': ComponentsLinkArray;
      'components.heading': ComponentsHeading;
      'components.experience': ComponentsExperience;
      'components.experience-text': ComponentsExperienceText;
      'components.about-me': ComponentsAboutMe;
      'components.about-me-text': ComponentsAboutMeText;
      'components.about-me-info': ComponentsAboutMeInfo;
    }
  }
}
