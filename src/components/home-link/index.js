import Link from 'next/link';

const HomeLink = () => (
  <div className="icon-container">
    <Link href="/">
      <img src="/icon.svg" className="home-link" alt="Home" />
    </Link>
  </div>
);

export default HomeLink;
