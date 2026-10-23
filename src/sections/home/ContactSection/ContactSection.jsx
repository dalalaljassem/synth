import { CornerFrame } from '@/components/ui/CornerFrame';
import { MorseDivider } from '@/components/ui/MorseDivider';
import './ContactSection.css';

/** Closing call to action and contact channels. */
export function ContactSection({ label, heading, audiences, channels, morseCode }) {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <MorseDivider code={morseCode} label={label} labelId="contact-heading" />

      <CornerFrame className="contact-section__body">
        <p className="contact-section__heading">{heading}</p>

        <span className="contact-section__rule" aria-hidden="true">
          {morseCode}
        </span>

        <div className="contact-section__details">
          <ul className="contact-section__audiences">
            {audiences.map((audience) => (
              <li key={audience}>{audience}</li>
            ))}
          </ul>
          <address className="contact-section__channels">
            {channels.map((channel) => (
              <a
                key={channel.id}
                className="contact-section__channel"
                href={channel.href}
                {...(channel.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {channel.label}
              </a>
            ))}
          </address>
        </div>
      </CornerFrame>
    </section>
  );
}
