import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsAboutMe extends Struct.ComponentSchema {
  collectionName: 'components_components_about_mes';
  info: {
    description: '';
    displayName: 'About Me';
  };
  attributes: {
    aboutMeTexts: Schema.Attribute.Component<'components.about-me-text', true>;
    heading: Schema.Attribute.String;
    iconLinks: Schema.Attribute.Component<'utils.icon-link', true>;
  };
}

export interface ComponentsAboutMeText extends Struct.ComponentSchema {
  collectionName: 'components_components_about_me_texts';
  info: {
    description: '';
    displayName: 'About Me Text';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'>;
    text: Schema.Attribute.Text;
  };
}

export interface ComponentsExperience extends Struct.ComponentSchema {
  collectionName: 'components_components_experiences';
  info: {
    displayName: 'Experience';
    icon: '';
  };
  attributes: {
    experienceTexts: Schema.Attribute.Component<
      'components.experience-text',
      true
    >;
    heading: Schema.Attribute.String;
  };
}

export interface ComponentsExperienceText extends Struct.ComponentSchema {
  collectionName: 'components_components_experience_texts';
  info: {
    displayName: 'Experience Text';
  };
  attributes: {
    content: Schema.Attribute.Text;
    endingDate: Schema.Attribute.Date;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    startingDate: Schema.Attribute.Date;
  };
}

export interface ComponentsHeading extends Struct.ComponentSchema {
  collectionName: 'components_components_headings';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    ctaButton: Schema.Attribute.Component<'utils.link', false>;
    image: Schema.Attribute.Media<'images'>;
    subheading: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ComponentsLinkArray extends Struct.ComponentSchema {
  collectionName: 'components_components_link_arrays';
  info: {
    description: '';
    displayName: 'Link Array';
  };
  attributes: {
    header: Schema.Attribute.String;
    links: Schema.Attribute.Component<'utils.link', true>;
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

export interface ComponentsMyInfo extends Struct.ComponentSchema {
  collectionName: 'components_components_my_infos';
  info: {
    description: '';
    displayName: 'My Info';
  };
  attributes: {
    dateOfBirth: Schema.Attribute.Date;
    socialLinks: Schema.Attribute.Component<'utils.icon-link', true>;
    startedProgramming: Schema.Attribute.Date;
  };
}

export interface ComponentsSkills extends Struct.ComponentSchema {
  collectionName: 'components_components_skills';
  info: {
    description: '';
    displayName: 'Skills';
  };
  attributes: {
    skillsHeading: Schema.Attribute.String;
    skillText: Schema.Attribute.RichText & Schema.Attribute.Required;
    techStack: Schema.Attribute.Component<'components.tech-stack', false>;
  };
}

export interface ComponentsTechStack extends Struct.ComponentSchema {
  collectionName: 'components_components_tech_stacks';
  info: {
    description: '';
    displayName: 'techStack';
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
    testimonialHeading: Schema.Attribute.String;
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
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
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

export interface UtilsIconLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_icon_links';
  info: {
    description: '';
    displayName: 'Icon Link';
  };
  attributes: {
    alt: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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
      'components.about-me-text': ComponentsAboutMeText;
      'components.experience': ComponentsExperience;
      'components.experience-text': ComponentsExperienceText;
      'components.heading': ComponentsHeading;
      'components.link-array': ComponentsLinkArray;
      'components.marquee': ComponentsMarquee;
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
