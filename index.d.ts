declare interface ENVIRONMENT {
	BRAIN_API: string;
  }
  
  declare interface Window {
	__ENV__: ENVIRONMENT;
  }
  
  declare type AnyObject = {
	//eslint-disable-next-line
	[key: string]: any;
  };
  
  declare module '*.svg' {
	const content: React.ComponentType<React.SVGProps<SVGSVGElement> | CustomIconComponentProps>;
	export default content;
  }
  
  