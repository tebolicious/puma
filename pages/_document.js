import Document, { Html, Head, Main, NextScript } from 'next/document'
import fs from 'fs'
import path from 'path'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    let pubId = ''
    try {
      const dbFile = path.join(process.cwd(), 'data', 'ads.json')
      const data = JSON.parse(fs.readFileSync(dbFile, 'utf8') || '{}')
      pubId = data.pubId || ''
    } catch(e) {}
    return { ...initialProps, pubId }
  }

  render() {
    const { pubId } = this.props
    // Build the disable-auto-ads config; include google_ad_client when pubId is set
    const disableAutoAdsScript = pubId
      ? `(adsbygoogle=window.adsbygoogle||[]).push({google_ad_client:"${pubId}",enable_page_level_ads:false});`
      : `window.adsbygoogle=window.adsbygoogle||[];`

    return (
      <Html lang="en">
        <Head>
          {/* Disable AdSense automatic/auto ads. Manual slots are limited to the
              3 configured units: top (home), in-article (job detail), multiplex (home). */}
          <script dangerouslySetInnerHTML={{ __html: disableAutoAdsScript }} />
          {/* WAU traffic counter dashboard */}
          <script dangerouslySetInnerHTML={{ __html: `var _wau = _wau || []; _wau.push(["map", "y4fcg0lsbn", "40q", "250", "125", "classic", "cross-pink"]);` }} />
          <script dangerouslySetInnerHTML={{ __html: `var _wau = _wau || []; _wau.push(["dynamic", "ukwpzusk10", "klo", "c4302bffffff", "small"]);` }} />
          <script async src="//waust.at/m.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
