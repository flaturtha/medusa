import { HTMLAttributes } from 'react';

export default (props: HTMLAttributes<HTMLOrSVGElement>) => (
  <svg {...props} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22 0H2C0.89543 0 0 0.89543 0 2V14C0 15.1046 0.89543 16 2 16H22C23.1046 16 24 15.1046 24 14V2C24 0.89543 23.1046 0 22 0Z"
      fill="#252525"
    />
    <path
      d="M9 13C11.7614 13 14 10.7614 14 8C14 5.23858 11.7614 3 9 3C6.23858 3 4 5.23858 4 8C4 10.7614 6.23858 13 9 13Z"
      fill="#EB001B"
    />
    <path
      d="M15 13C17.7614 13 20 10.7614 20 8C20 5.23858 17.7614 3 15 3C12.2386 3 10 5.23858 10 8C10 10.7614 12.2386 13 15 13Z"
      fill="#F79E1B"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.99963C13.2144 4.91184 14 6.36418 14 8C14 9.63582 13.2144 11.0882 12 12.0004C10.7856 11.0882 10 9.63582 10 8C10 6.36418 10.7856 4.91184 12 3.99963V3.99963Z"
      fill="#FF5F00"
    />
  </svg>
);
