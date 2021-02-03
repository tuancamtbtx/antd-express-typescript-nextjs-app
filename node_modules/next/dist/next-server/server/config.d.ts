import { Header, Rewrite, Redirect } from '../../lib/load-custom-routes';
export declare type NextConfig = {
    [key: string]: any;
} & {
    i18n: {
        domains?: Array<{
            http?: true;
            domain: string;
            locales?: string[];
            defaultLocale: string;
        }>;
        locales: string[];
        defaultLocale: string;
        localeDetection?: false;
    } | null;
    headers?: () => Promise<Header[]>;
    rewrites?: () => Promise<Rewrite[]>;
    redirects?: () => Promise<Redirect[]>;
};
export declare function normalizeConfig(phase: string, config: any): any;
export default function loadConfig(phase: string, dir: string, customConfig?: object | null): NextConfig;
export declare function isTargetLikeServerless(target: string): boolean;
