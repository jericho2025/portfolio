import profilePhoto from '../assets/jericho-profile.png';

export default function Hero() {
  return (
    <section className="home-page" aria-labelledby="home-title">
      <div className="home-layout page-content">
        <div className="home-introduction"><p>Hello, I’m</p><h1 id="home-title">Jericho M. Flores</h1><p className="home-role">Full-Stack Web Developer</p></div>
        <div className="home-portrait"><img src={profilePhoto} alt="Jericho M. Flores in formal attire" width="1230" height="1278" fetchPriority="high" /></div>
      </div>
    </section>
  );
}
