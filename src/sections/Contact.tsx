import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const MAX = { name: 80, email: 120, message: 300 };

const fieldStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  outline: 'none',
  color: 'var(--foreground)',
  padding: '10px 0',
  fontSize: '1rem',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.7rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
};

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  // Honeypot: campo invisível para pessoas; robôs costumam preencher
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (key === 'email') setEmailError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (website) {
      // Robô detectado: finge sucesso sem enviar nada
      setStatus('sent');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setEmailError(true);
      return;
    }
    setStatus('sending');
    try {
      // O destinatário é fixo no template do EmailJS, nunca enviado pelo navegador
      await emailjs.send(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT, {
        from_email: form.email.slice(0, MAX.email),
        from_name: form.name.slice(0, MAX.name),
        message: form.message.slice(0, MAX.message),
      });
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="w-full flex flex-col items-center" style={{ backgroundColor: 'var(--background)', padding: '96px 0' }}>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20" style={{ padding: '0 32px' }}>
        <div data-reveal className="flex flex-col justify-center gap-6">
          <p className="text-sm font-bold tracking-tight text-blue-400">
            {t('contact.title')} {t('contact.subtitle')}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight" style={{ color: 'var(--foreground)' }}>
            {t('contact.heading')}
          </h2>
          <p className="max-w-sm" style={{ color: 'var(--text-muted)' }}>{t('contact.intro')}</p>
        </div>

        <form data-reveal onSubmit={handleSubmit} className="flex flex-col gap-8" style={{ maxWidth: '32rem' }}>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </label>
          </div>
          <label>
            <span style={labelStyle}>{t('contact.name')}</span>
            <input
              type="text"
              required
              autoComplete="name"
              maxLength={MAX.name}
              placeholder={t('contact.namePh')}
              value={form.name}
              onChange={update('name')}
              style={fieldStyle}
            />
          </label>
          <label>
            <span style={labelStyle}>{t('contact.email')}</span>
            <input
              type="email"
              required
              autoComplete="email"
              maxLength={MAX.email}
              placeholder={t('contact.emailPh')}
              value={form.email}
              onChange={update('email')}
              style={fieldStyle}
            />
            {emailError && <span className="text-xs text-red-400">{t('contact.invalidEmail')}</span>}
          </label>
          <label>
            <span style={labelStyle}>{t('contact.message')}</span>
            <textarea
              required
              rows={5}
              maxLength={MAX.message}
              placeholder={t('contact.messagePh')}
              value={form.message}
              onChange={update('message')}
              style={{ ...fieldStyle, resize: 'none' }}
            />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{form.message.length}/{MAX.message}</span>
          </label>

          <div className="flex flex-col gap-3 items-start">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="cursor-pointer rounded-full text-sm font-semibold transition-colors hover:bg-white/10 disabled:opacity-50 disabled:cursor-wait"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'var(--foreground)', padding: '12px 28px' }}
            >
              {status === 'sending' ? t('contact.sending') : `${t('contact.send')} →`}
            </button>
            {status === 'sent' && (
              <p className="text-sm text-emerald-400">✓ {t('contact.sent')} {t('contact.thanks')}</p>
            )}
            {status === 'error' && <p className="text-sm text-red-400">{t('contact.error')}</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
