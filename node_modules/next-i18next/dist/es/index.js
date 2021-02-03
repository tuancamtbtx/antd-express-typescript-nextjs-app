import { withTranslation, useTranslation, Trans } from 'react-i18next';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { createConfig } from './config/create-config';
import createI18NextClient from './create-client';
import { appWithTranslation, withInternals } from './hocs';
import { consoleMessage } from './utils';
import { Link } from './components';
import { wrapRouter } from './router';
export { I18nContext, withTranslation } from 'react-i18next';
export default class NextI18Next {
  constructor(userConfig) {
    this.config = createConfig(userConfig);
    this.consoleMessage = consoleMessage.bind(this);
    /* Validation */

    this.withNamespaces = () => {
      throw new Error('next-i18next has upgraded to react-i18next v10 - please rename withNamespaces to withTranslation.');
    };

    const {
      i18n,
      initPromise
    } = createI18NextClient(this.config);
    this.i18n = i18n;
    this.initPromise = initPromise;
    this.appWithTranslation = appWithTranslation.bind(this);

    this.withTranslation = (namespace, options) => Component => hoistNonReactStatics(withTranslation(namespace, options)(Component), Component);

    const nextI18NextInternals = {
      config: this.config,
      i18n: this.i18n
    };
    this.Link = withInternals(Link, nextI18NextInternals);
    this.Router = wrapRouter(nextI18NextInternals);
    /* Directly export `react-i18next` methods */

    this.Trans = Trans;
    this.useTranslation = useTranslation;
  }

}