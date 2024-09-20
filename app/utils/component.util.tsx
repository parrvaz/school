import fa from 'app/lib/fa.json';

export const TOAST_CONFIG = {
  duration: 5000,
  style: {
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'IRANSans_SemiBold',
    lineHeight: '180%',
  },
  error: {
    style: { background: '#B91C1C' },
    icon: <span className="icon-close text-20" />,
  },
  success: {
    style: { background: '#047857' },
    icon: <span className="icon-check text-20" />,
  },
};

export const handleError = (error: { message: string }): JSX.Element =>
  error && (
    <div className="isCenter absolute -bottom-5 right-0 font-regular text-10 text-red80">
      <span className="icon-info-circle ml-1 text-12" />
      {error.message || fa.global.rules.required}
    </div>
  );
