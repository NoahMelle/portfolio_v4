import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsAboutMe extends Struct.ComponentSchema {
  collectionName: 'components_components_about_mes';
  info: {
    displayName: 'About Me';
  };
  attributes: {
    iconLinks: Schema.Attribute.Component<'utils.icon-link', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    quickInfo: Schema.Attribute.Component<'components.about-me-info', true>;
    text: Schema.Attribute.RichText;
  };
}

export interface ComponentsAboutMeInfo extends Struct.ComponentSchema {
  collectionName: 'components_components_about_me_infos';
  info: {
    displayName: 'About Me Info';
  };
  attributes: {
    alt: Schema.Attribute.String;
    content: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface ComponentsExperience extends Struct.ComponentSchema {
  collectionName: 'components_components_experiences';
  info: {
    displayName: 'Experience';
  };
  attributes: {
    experienceTexts: Schema.Attribute.Component<
      'components.experience-text',
      true
    >;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsExperienceText extends Struct.ComponentSchema {
  collectionName: 'components_components_experience_texts';
  info: {
    description: '';
    displayName: 'Experience Text';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    endingDate: Schema.Attribute.Date;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    startingDate: Schema.Attribute.Date;
  };
}

export interface ComponentsFooter extends Struct.ComponentSchema {
  collectionName: 'components_components_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    blurColor: Schema.Attribute.Relation<
      'oneToOne',
      'api::theme-color.theme-color'
    >;
    buttons: Schema.Attribute.Component<'utils.link', true>;
    cta: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsHero extends Struct.ComponentSchema {
  collectionName: 'components_components_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    subheading: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsMyInfo extends Struct.ComponentSchema {
  collectionName: 'components_components_my_infos';
  info: {
    displayName: 'My Info';
  };
  attributes: {
    dateOfBirth: Schema.Attribute.Date &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'2008-11-30'>;
    socialLinks: Schema.Attribute.Component<'utils.icon-link', true>;
    startedProgramming: Schema.Attribute.Date & Schema.Attribute.Required;
  };
}

export interface ComponentsSkills extends Struct.ComponentSchema {
  collectionName: 'components_components_skills';
  info: {
    description: '';
    displayName: 'Skills';
  };
  attributes: {
    skillsHeading: Schema.Attribute.String & Schema.Attribute.Required;
    skillText: Schema.Attribute.RichText;
    techStack: Schema.Attribute.Component<'components.tech-stack', false>;
  };
}

export interface ComponentsTechStack extends Struct.ComponentSchema {
  collectionName: 'components_components_tech_stacks';
  info: {
    displayName: 'Tech Stack';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    techStackSkills: Schema.Attribute.Relation<'oneToMany', 'api::skill.skill'>;
  };
}

export interface ComponentsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_components_testimonials';
  info: {
    displayName: 'Testimonials';
  };
  attributes: {
    testimonialHeading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoMetadata extends Struct.ComponentSchema {
  collectionName: 'components_seo_metadata';
  info: {
    description: '';
    displayName: 'Metadata';
  };
  attributes: {
    description: Schema.Attribute.Text;
    keywords: Schema.Attribute.Component<'utils.string', true>;
    ogTags: Schema.Attribute.Component<'seo.open-graph-tags', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SeoOpenGraphTags extends Struct.ComponentSchema {
  collectionName: 'components_seo_open_graph_tags';
  info: {
    displayName: 'Open Graph Tags';
  };
  attributes: {
    description: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['website', 'article', 'video.movie']>;
  };
}

export interface UtilsIconLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_icon_links';
  info: {
    displayName: 'Icon Link';
  };
  attributes: {
    alt: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsString extends Struct.ComponentSchema {
  collectionName: 'components_utils_strings';
  info: {
    displayName: 'String';
  };
  attributes: {
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.about-me': ComponentsAboutMe;
      'components.about-me-info': ComponentsAboutMeInfo;
      'components.experience': ComponentsExperience;
      'components.experience-text': ComponentsExperienceText;
      'components.footer': ComponentsFooter;
      'components.hero': ComponentsHero;
      'components.my-info': ComponentsMyInfo;
      'components.skills': ComponentsSkills;
      'components.tech-stack': ComponentsTechStack;
      'components.testimonials': ComponentsTestimonials;
      'seo.metadata': SeoMetadata;
      'seo.open-graph-tags': SeoOpenGraphTags;
      'utils.icon-link': UtilsIconLink;
      'utils.link': UtilsLink;
      'utils.string': UtilsString;
    }
  }
}
