import { ContentBody, ContentClient, ContentItem } from 'dc-delivery-sdk-js';
import { DcConfig } from '../components';
import { CmsImage } from '../utils';

interface Criteria {
  tags: string[];
  behaviors: string[];
}

interface ParsedCriteria {
  tags: string;
  behaviours: string;
}

export interface TargetedContentGroup extends ParsedCriteria {
  id: number;
  criteria: Criteria;
  component: {
    [key: string]: any;
    title: string;
    image: CmsImage;
  };
}

export type TargetedContent = TargetedContentGroup[] | [];

interface Content extends ContentBody {
  groups?: TargetedContentGroup[];
}

export default async function getTargetedContent({ deliveryId, ...config }: DcConfig): Promise<TargetedContent> {
  const client = new ContentClient(config);
  const content = await client.getContentItemById<Content>(deliveryId);
  return parseContent(content);
}

function parseContent(content: ContentItem<Content>): TargetedContent {
  return (
    content?.body?.groups?.map((group: any = {}, index: number) => {
      const { criteria, components = [] } = group;
      const { tags = [], behaviors = [] } = criteria;
      return {
        id: index,
        criteria: { tags, behaviors },
        ...parseCriteria(criteria),
        component: components[0] ?? {},
      };
    }) ?? []
  );
}

function parseCriteria({ tags = [], behaviors = [] }: Criteria): ParsedCriteria {
  return {
    tags: tags.join('|'),
    behaviours: behaviors.join('|'),
  };
}
