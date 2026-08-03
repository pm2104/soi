export default function Home() {
  return (
    <main className="page">
      <span className="corner corner--tl" aria-hidden="true" />
      <span className="corner corner--tr" aria-hidden="true" />
      <span className="corner corner--bl" aria-hidden="true" />
      <span className="corner corner--br" aria-hidden="true" />

      <div className="main">
        <div className="content">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            SOI &middot; Supervisors On India
          </p>

          <h1 className="headline">
            Where Construction
            <br />
            Projects Meet
            <br />
            <span className="accent">Trusted Professionals</span>
          </h1>

          <div className="stripe" aria-hidden="true" />

          <p className="tagline">
            Hire verified supervisors, engineers, architects, project
            managers, and construction experts across India.
          </p>

          <div className="domainRow">
            <a href="https://soiglobal.in">soiglobal.in</a>
            <span className="domainSep" aria-hidden="true" />
            <span className="status">Launching soon</span>
          </div>
        </div>
      </div>

      <footer className="titleBlock">
        <span>
          Project: <strong>Supervisors On India</strong>
        </span>
        <span>
          Status: <strong>Under Construction</strong>
        </span>
        <span>
          Site: <strong>soiglobal.in</strong>
        </span>
        <span>
          Rev: <strong>A</strong>
        </span>
      </footer>
    </main>
  );
}
