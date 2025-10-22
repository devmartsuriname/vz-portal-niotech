// Page Builder Type Definitions

export type SectionType = 'hero' | 'text' | 'image' | 'cta' | 'faq' | 'services';

export interface BaseSection {
  id: string;
  type: SectionType;
  order: number;
}

export interface HeroSection extends BaseSection {
  type: 'hero';
  props: {
    title: string;
    subtitle?: string;
    backgroundImage?: string;
    ctaText?: string;
    ctaLink?: string;
    alignment?: 'left' | 'center' | 'right';
  };
}

export interface TextSection extends BaseSection {
  type: 'text';
  props: {
    title?: string;
    content: string;
    alignment?: 'left' | 'center' | 'right';
    backgroundColor?: string;
  };
}

export interface ImageSection extends BaseSection {
  type: 'image';
  props: {
    imageUrl: string;
    alt: string;
    caption?: string;
    alignment?: 'left' | 'center' | 'right';
    width?: 'small' | 'medium' | 'large' | 'full';
  };
}

export interface CTASection extends BaseSection {
  type: 'cta';
  props: {
    title: string;
    description?: string;
    buttonText: string;
    buttonLink: string;
    backgroundColor?: string;
    textColor?: string;
  };
}

export interface FAQSection extends BaseSection {
  type: 'faq';
  props: {
    title?: string;
    category?: string;
    showAll?: boolean;
  };
}

export interface ServicesSection extends BaseSection {
  type: 'services';
  props: {
    title?: string;
    description?: string;
    displayStyle?: 'cards' | 'list';
  };
}

export type PageSection = 
  | HeroSection 
  | TextSection 
  | ImageSection 
  | CTASection 
  | FAQSection 
  | ServicesSection;

export interface PageWithSections {
  id: string;
  title: string;
  slug: string;
  sections: PageSection[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
