import { format } from 'url';

import getConfig from 'next/config';
import NextLink, { LinkProps } from 'next/link';

interface TransitionOptions {
	shallow?: boolean;
	locale?: string | false;
}

const { publicRuntimeConfig } = getConfig();
export const isDev = process.env.NODE_ENV !== 'production';

export { publicRuntimeConfig };

export const returnBasePath = (path: string): string => {
	if (isDev) return format(path);

	return format(path);
	// return (publicRuntimeConfig.basePath || '') + format(path);
};

export function routerPath(path = '/'): [string, string, TransitionOptions?] {
	return [
		path,
		isDev ? path : path,
		// `${publicRuntimeConfig.basePath || ''}${format(path)}`
		{ shallow: true }
	];
}

const Link: React.FunctionComponent<LinkProps> = ({ children, ...props }) => (
	<NextLink {...props} as={isDev ? props.href : props.href}>
		{children}
	</NextLink>
);

export default Link;
