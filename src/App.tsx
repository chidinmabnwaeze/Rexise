import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import mannequinsAll from "./assets/web/mannequins-all.webp";
import mannequinCreate from "./assets/web/mannequin-create.webp";
import mannequinPresent from "./assets/web/mannequin-present.webp";
import logoNavy from "./assets/web/logo-wordmark-navy.webp";
import logoCream from "./assets/web/logo-wordmark-cream.webp";
import logoTagline from "./assets/web/logo-tagline-cream.webp";
import "./App.css";

const CONTACT_EMAIL = "hello@rexise.com";
const CURRENT_YEAR = new Date().getFullYear();

const NAV_LINKS = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#sustainability", label: "Sustainability" },
  { href: "#audience", label: "Who it's for" },
];

/* ---------- Icons ---------- */

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ArrowIcon = () => (
  <Icon>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

const CheckIcon = () => (
  <Icon>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);

const icons = {
  layers: (
    <Icon>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </Icon>
  ),
  shield: (
    <Icon>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </Icon>
  ),
  recycle: (
    <Icon>
      <path d="M7 19H4.5a1.5 1.5 0 0 1-1.3-2.25L5.5 13" />
      <path d="M11 19h8.5a1.5 1.5 0 0 0 1.3-2.25L18.5 13" />
      <path d="M9 7.5l1.7-2.8a1.5 1.5 0 0 1 2.6 0L16 9" />
      <path d="M13 16l-2 3 2 3M3.5 10.5L5.5 13l3-.8M16 9l-3.4.2" />
    </Icon>
  ),
  scissors: (
    <Icon>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.1 8.1L20 20M8.1 15.9L20 4" />
    </Icon>
  ),
  pen: (
    <Icon>
      <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" />
      <path d="M14 7l3 3" />
    </Icon>
  ),
  store: (
    <Icon>
      <path d="M4 9l1.5-5h13L20 9" />
      <path d="M4 9h16v2a3 3 0 0 1-5.3 2 3 3 0 0 1-5.4 0A3 3 0 0 1 4 11V9z" />
      <path d="M5 13v7h14v-7M10 20v-4h4v4" />
    </Icon>
  ),
};

/* ---------- Content ---------- */

const VALUE_PROPS = [
  {
    icon: icons.layers,
    title: "Two tools in one",
    text: "Drape, pin and fit on the same form you use to present the finished piece—less tool redundancy, more room to create.",
  },
  {
    icon: icons.shield,
    title: "Built to last",
    text: "A resilient, sculptural surface designed for the daily wear of real studios and changing collections.",
  },
  {
    icon: icons.recycle,
    title: "Circular by design",
    text: "Made from recycled textile offcuts, with modular parts that can be repaired, replaced or upgraded.",
  },
];

const STEPS = [
  {
    title: "Create",
    text: "Fit the foam cover for precise pinning and draping during everyday garment construction.",
  },
  {
    title: "Present",
    text: "Remove the cover to reveal a refined display silhouette—ready for the showroom, shoot or shop floor.",
  },
  {
    title: "Renew",
    text: "Replace or upgrade individual components as your needs change, without replacing the entire form.",
  },
];

const AUDIENCES = [
  {
    icon: icons.scissors,
    title: "Fashion students & schools",
    text: "One durable form that covers coursework from first toile to final showcase.",
  },
  {
    icon: icons.pen,
    title: "Designers & ateliers",
    text: "Construct and present collections on a single form that keeps pace with your studio.",
  },
  {
    icon: icons.store,
    title: "Boutiques & retailers",
    text: "A display mannequin with craftsmanship and a sustainability story your customers can see.",
  },
];

/* ---------- Hooks ---------- */

function useRevealOnScroll() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ---------- Sections ---------- */

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="#top" className="header-logo" aria-label="Rexise home" onClick={close}>
          <img src={logoNavy} alt="Rexise" width="130" height="50" />
        </a>

        <nav
          id="primary-nav"
          className={`primary-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary btn-sm" onClick={close}>
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">The dual-purpose dress form</p>
          <h1>
            One mannequin. Multiple fits. <span className="accent">More possibilities.</span>
          </h1>
          <p className="lead">
            Rexise is a durable, modular mannequin built for both garment
            construction and display, made from recycled textile offcuts and
            designed to evolve with your work.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Get in touch <ArrowIcon />
            </a>
            <a href="#how-it-works" className="btn btn-ghost">
              See how it works
            </a>
          </div>
          {/* <ul className="hero-highlights">
            <li>
              <CheckIcon /> Create &amp; present
            </li>
            <li>
              <CheckIcon /> Recycled textile surface
            </li>
            <li>
              <CheckIcon /> Modular, replaceable parts
            </li>
          </ul> */}
        </div>

        <div className="hero-media reveal">
          <div className="hero-backdrop" aria-hidden="true" />
          <img
            src={mannequinsAll}
            alt="Three Rexise mannequins showing the create and display configurations"
            width="1630"
            height="1300"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <p className="eyebrow">Why Rexise</p>
          <h2>One form for the whole journey of a garment.</h2>
          <p>
            Rexise brings garment construction and presentation into one
            considered object—designed for real studios, changing collections
            and a longer life.
          </p>
        </div>

        <div className="card-grid">
          {VALUE_PROPS.map((item) => (
            <article className="feature-card reveal" key={item.title}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Product() {
  return (
    <section className="section section-alt" id="product">
      <div className="container">
        <div className="section-header reveal">
          <p className="eyebrow">Two modes, one form</p>
          <h2>Designed to do more.</h2>
        </div>

        <div className="mode-grid">
          <article className="mode-card reveal">
            <div className="mode-media">
              <img
                src={mannequinCreate}
                alt="Rexise mannequin fitted with the foam cover for draping"
                width="570"
                height="1300"
                loading="lazy"
              />
            </div>
            <div className="mode-body">
              <span className="mode-tag">Mode 01</span>
              <h3>Create</h3>
              <p>Precision draping support for everyday garment construction.</p>
              <ul className="check-list">
                <li>
                  <CheckIcon /> Foam cover for pinning and draping
                </li>
                <li>
                  <CheckIcon /> Stable, adjustable-height stand
                </li>
                <li>
                  <CheckIcon /> Smooth-rolling castor base
                </li>
              </ul>
            </div>
          </article>

          <article className="mode-card reveal">
            <div className="mode-media">
              <img
                src={mannequinPresent}
                alt="Rexise mannequin in display mode with its recycled textile finish"
                width="527"
                height="1300"
                loading="lazy"
              />
            </div>
            <div className="mode-body">
              <span className="mode-tag">Mode 02</span>
              <h3>Present</h3>
              <p>A refined display silhouette that completes the story.</p>
              <ul className="check-list">
                <li>
                  <CheckIcon /> Sculptural recycled-textile finish
                </li>
                <li>
                  <CheckIcon /> Showroom, shoot and retail ready
                </li>
                <li>
                  <CheckIcon /> No second mannequin needed
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-header reveal">
          <p className="eyebrow">How it works</p>
          <h2>Shape it. Keep it.</h2>
          <p>
            A modular architecture lets one Rexise move with you from the
            cutting table to the display floor—and keep going for years.
          </p>
        </div>

        <ol className="steps">
          {STEPS.map((step, index) => (
            <li className="step reveal" key={step.title}>
              <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Sustainability() {
  return (
    <section className="section section-dark" id="sustainability">
      <div className="container split">
        <div className="split-copy reveal">
          <p className="eyebrow">Circular by design</p>
          <h2>
            Made from waste. <span className="accent">Built to last.</span>
          </h2>
          <p className="lead">
            Rexise transforms recycled textile offcuts into a resilient,
            sculptural surface. Its modular architecture means key components
            can be replaced or upgraded—without replacing the entire form.
          </p>
          <dl className="pillars">
            <div>
              <dt>Repairable</dt>
              <dd>Fix what wears out instead of discarding the form.</dd>
            </div>
            <div>
              <dt>Replaceable</dt>
              <dd>Swap individual components as they reach end of life.</dd>
            </div>
            <div>
              <dt>Upgrade-ready</dt>
              <dd>Add new parts as your practice and needs evolve.</dd>
            </div>
          </dl>
        </div>
        <div className="split-media reveal">
          <img
            src={mannequinPresent}
            alt="Close view of the Rexise recycled-textile display form"
            width="527"
            height="1300"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="section" id="audience">
      <div className="container">
        <div className="section-header reveal">
          <p className="eyebrow">Who it's for</p>
          <h2>Made for fashion. Designed for tomorrow.</h2>
        </div>
        <div className="card-grid">
          {AUDIENCES.map((item) => (
            <article className="feature-card feature-card-outline reveal" key={item.title}>
              <div className="feature-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const role = String(data.get("role") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `Rexise enquiry${name ? ` from ${name}` : ""}`;
    const body = `${message}\n\n—\nName: ${name}\nEmail: ${data.get("email") ?? ""}\nI am a: ${role}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy reveal">
          <p className="eyebrow">Contact</p>
          <h2>Reimagine the creative form.</h2>
          <p className="lead">
            Interested in Rexise for your studio, school or store? Tell us a
            little about what you need and we'll get back to you.
          </p>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>

        <form className="contact-form reveal" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              <span>Name</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </div>
          <label>
            <span>I am a…</span>
            <select name="role" defaultValue="Designer / atelier">
              <option>Student / school</option>
              <option>Designer / atelier</option>
              <option>Boutique / retailer</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            <span>Message</span>
            <textarea name="message" rows={5} required />
          </label>
          <button type="submit" className="btn btn-primary">
            Send message <ArrowIcon />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={logoTagline} alt="Rexise — one mannequin, multiple fits, more possibilities" width="200" height="88" loading="lazy" />
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
            <li>
              <a href="#contact">Send an enquiry</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <img src={logoCream} alt="" width="84" height="33" aria-hidden="true" />
        <p>© {CURRENT_YEAR} Rexise. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function App() {
  useRevealOnScroll();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <ValueProps />
        <Product />
        <HowItWorks />
        <Sustainability />
        <Audience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
