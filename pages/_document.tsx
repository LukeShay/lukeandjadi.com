import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
} from 'next/document';
import config from '@/client/config';
import { datadogLogs } from '@datadog/browser-logs';
import { GoogleAnalytics } from '@lukeshay/next-ga';

class MyDocument extends Document {
  constructor(props: DocumentProps) {
    super(props);

    datadogLogs.init({
      clientToken: 'pubbedc348b2a152c2fe4fe7649fc7f1f2e',
      site: 'datadoghq.com',
      forwardErrorsToLogs: true,
      sampleRate: 100,
    });
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&display=swap"
            rel="stylesheet"
          />
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${config.env.recaptchaSiteKey}`}
            async
          />
          <GoogleAnalytics />
        </Head>
        <body className="font-serif tracking-wide">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
