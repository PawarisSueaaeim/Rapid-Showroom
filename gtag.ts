export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_GTM;

interface EventParams {
  action: string;
  category: string;
  label: string;
  value: number;
}

export const pageview = (url: string): void => {
  (window as any).gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({
  action,
  category,
  label,
  value,
}: EventParams): void => {
  (window as any).gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
