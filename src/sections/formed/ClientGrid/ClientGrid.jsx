import { Link } from 'react-router-dom';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getFormedClients } from '@/services/contentService';
import { SmartImage } from '@/components/ui/SmartImage';
import './ClientGrid.css';

const pad = (n) => String(n).padStart(2, '0');

/** synth.formed, level 1: a card for every client → its campaigns page. */
export function ClientGrid() {
  const { data: clients } = useAsyncData(getFormedClients);
  if (!clients) return null;

  return (
    <section className="client-grid" aria-labelledby="client-grid-heading">
      <div className="container">
        <header className="client-grid__head">
          <h2 id="client-grid-heading" className="client-grid__label">Clients</h2>
          <span className="client-grid__count">({pad(clients.length)})</span>
        </header>

        <ul className="client-grid__list">
          {clients.map((client, index) => (
            <li key={client.slug}>
              <Link className="client-card" to={`/formed/${client.slug}`}>
                <div className="notched">
                <div className="client-card__media notched__media" style={{ background: client.background }}>
                  <SmartImage
                    className="client-card__image"
                    src={client.slides[0].image}
                    alt=""
                    style={{ objectPosition: client.slides[0].focus }}
                    loading={index < 6 ? 'eager' : 'lazy'}
                  />
                </div>
                  <span className="notched__go" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="22" height="22">
                      <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                </div>
                <div className="client-card__meta">
                  <span className="client-card__number">{pad(index + 1)}</span>
                  <h3 className="client-card__name">{client.name}</h3>
                  <span className="client-card__campaigns">
                    ({pad(client.campaigns.length)}) {client.campaigns.length === 1 ? 'Campaign' : 'Campaigns'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
