import { useEffect } from 'react';
import '../components/index.css';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import('smoothscroll-polyfill').then(mod => mod.default.polyfill());

    import('vanilla-lazyload').then(mod => {
      window.lazyLoadInstance = new mod.default();
    });

    import('emoji-sprinkle/window');
  }, []);

  return <Component {...pageProps} />;
}
