const ArrowDataTransferHorizontalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#6a7382"} fill={"none"} {...props}>
    <path d="M19 9H6.65856C5.65277 9 5.14987 9 5.02472 8.69134C4.89957 8.38268 5.25517 8.01942 5.96637 7.29289L8.21091 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 15H17.3414C18.3472 15 18.8501 15 18.9753 15.3087C19.1004 15.6173 18.7448 15.9806 18.0336 16.7071L15.7891 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Home05Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#6a7382"} fill={"none"} {...props}>
    <path d="M12 17H12.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 8.5V13.5C20 17.2712 20 19.1569 18.8284 20.3284C17.6569 21.5 15.7712 21.5 12 21.5C8.22876 21.5 6.34315 21.5 5.17157 20.3284C4 19.1569 4 17.2712 4 13.5V8.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M22 10.5L17.6569 6.33548C14.9902 3.77849 13.6569 2.5 12 2.5C10.3431 2.5 9.00981 3.77849 6.34315 6.33548L2 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Clock03Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#6a7382"} fill={"none"} {...props}>
    <path d="M18.952 8.60657L21.4622 8.45376C19.6629 3.70477 14.497 0.999914 9.4604 2.34474C4.09599 3.77711 0.909631 9.26107 2.34347 14.5935C3.77731 19.926 9.28839 23.0876 14.6528 21.6553C18.6358 20.5917 21.4181 17.2946 22 13.4844" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MoneySendSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#6a7382"} fill={"none"} {...props}>
    <path d="M12.002 9.00098C10.8974 9.00098 10.002 9.67255 10.002 10.501C10.002 11.3294 10.8974 12.001 12.002 12.001C13.1065 12.001 14.002 12.6726 14.002 13.501C14.002 14.3294 13.1065 15.001 12.002 15.001M12.002 9.00098C12.8728 9.00098 13.6136 9.41838 13.8881 10.001M12.002 9.00098V8.00098M12.002 15.001C11.1311 15.001 10.3903 14.5836 10.1158 14.001M12.002 15.001V16.001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M13.5 2.50098C13.5 2.50098 12.6839 2.50098 12 2.50098C7.52166 2.50098 5.28249 2.50098 3.89124 3.89223C2.5 5.28347 2.5 7.52264 2.5 12.001C2.5 16.4793 2.5 18.7185 3.89124 20.1098C5.28249 21.501 7.52166 21.501 12 21.501C16.4783 21.501 18.7175 21.501 20.1088 20.1098C21.5 18.7185 21.5 16.4793 21.5 12.001C21.5 11.3171 21.5 10.501 21.5 10.501" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16.5 7.49902L20.6758 3.32082M21.5 6.97726L21.3818 3.88577C21.3818 3.15713 20.9467 2.70314 20.1542 2.64588L17.0302 2.49902" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cancel01Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#fffff"} fill={"none"} {...props}>
    <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRegistry: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  Home: Home05Icon,
  Transfer: ArrowDataTransferHorizontalIcon,
  Transactions: Clock03Icon,
  P2PTransfer: MoneySendSquareIcon,
  Cross: Cancel01Icon,
};

export default IconRegistry;