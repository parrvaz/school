import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import 'public/css/globals.css';
import 'public/css/icon.css';
import QueryProvider from './components/query-provider';
import { TOAST_CONFIG } from './utils/component.util';

export const metadata: Metadata = {
  title: 'School App',
  description: 'School',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  return (
    <html lang="en" data-theme="light">
      <body>
        <QueryProvider>
          <Toaster toastOptions={TOAST_CONFIG} />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
