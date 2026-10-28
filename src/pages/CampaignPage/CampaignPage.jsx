import { useParams } from 'react-router-dom';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProjectView } from '@/pages/ProjectPage/ProjectPage';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getFormedClient, getSiteContent } from '@/services/contentService';

/**
 * synth.formed, level 3: one campaign — client logo, campaign title and text,
 * then only that campaign's images (same layout as a project page).
 */
export function CampaignPage() {
  const { client: clientSlug, campaign: campaignSlug } = useParams();
  const client = useAsyncData(() => getFormedClient(clientSlug), [clientSlug]);
  const site = useAsyncData(getSiteContent);

  if (client.status === 'loading' || site.status === 'loading') return null;
  const campaign = client.data?.campaigns.find((item) => item.slug === campaignSlug);
  if (!campaign) return <NotFoundPage />;

  const project = {
    ...client.data,
    description: campaign.text,
    palette: campaign.palette,
    slides: campaign.slides,
  };

  return (
    <ProjectView
      key={`${clientSlug}/${campaignSlug}`}
      project={project}
      site={site.data}
      campaign={{ number: campaign.number, title: campaign.title, total: client.data.campaigns.length }}
      backTo={`/formed/${clientSlug}`}
    />
  );
}
