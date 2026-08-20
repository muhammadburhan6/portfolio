"use client";

import { FormEvent, useState } from "react";

const skillGroups = [
  { label: "Frontend", skills: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"] },
  { label: "Backend", skills: ["Node.js", "Express.js", "Flask"] },
  { label: "Database", skills: ["MongoDB", "Firebase Firestore", "Firebase Realtime Database", "SQLite"] },
  { label: "Tools & Services", skills: ["Firebase Authentication", "Git", "GitHub", "Vite", "NPM", "Android Studio"] },
  { label: "Mobile", skills: ["Java", "XML", "Android Development"] },
];

const projects = [
  { number: "02", name: "MERN Bus Ticketing Website", description: "A full-stack bus ticketing web application developed with the MERN stack.", stack: ["MongoDB", "Express.js", "React.js", "Node.js"] },
  { number: "03", name: "Student Task Manager", description: "A responsive task management application built with a modern frontend and Firebase services.", stack: ["React.js", "Firebase", "Tailwind CSS"] },
  { number: "04", name: "Flask Quiz Application", description: "A web-based quiz application developed in Python with Flask and database integration.", stack: ["Python", "Flask", "Database"] },
  { number: "05", name: "Library Management System", description: "A desktop application for managing library records with a graphical Python interface.", stack: ["Python", "Tkinter", "SQLite"] },
  { number: "06", name: "Phone Book Android Application", description: "An Android phone book application for organizing and managing contact information.", stack: ["Java", "XML", "SQLite / Firebase"] },
  { number: "07", name: "Online Books Store", description: "An Android-based online bookstore project designed as a mobile shopping experience.", stack: ["Android", "Java", "XML"] },
];

const journey = [
  ["01", "University foundations", "Software engineering projects and team-based development shaped a practical approach to building reliable applications."],
  ["02", "Web development", "Frontend, backend, and database integration across React, Node.js, Express.js, Flask, Firebase, and MongoDB projects."],
  ["03", "Mobile applications", "Android development using Java, XML, local databases, and Firebase where suited to the project."],
  ["04", "Final Year Project", "Building SkillSwap as a structured, full-stack skill exchange platform with a Git/GitHub-based team workflow."],
];

function ArrowIcon() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formNote, setFormNote] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    setFormNote("Your details are valid. A sending service is not connected yet, so no message was sent.");
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Muhammad Burhan Shariq — home">MBS<span>.</span></a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#home" onClick={closeMenu}>Home</a><a href="#about" onClick={closeMenu}>About</a><a href="#skills" onClick={closeMenu}>Skills</a><a href="#projects" onClick={closeMenu}>Projects</a><a href="#education" onClick={closeMenu}>Education</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Lahore, Pakistan</p>
          <h1>Muhammad<br /><em>Burhan Shariq</em></h1>
          <p className="role">Frontend / Full-Stack Web Developer</p>
          <p className="intro">Software Engineering graduate with hands-on experience in frontend and backend web development. I build responsive, user-focused web applications using modern technologies such as React, JavaScript, Node.js, Express.js, Firebase, and databases.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projects">View My Projects <span>↘</span></a>
            <a className="button button-secondary" href="#contact">Contact Me</a>
            <a className="text-link" href="https://github.com/muhammadburhan6" target="_blank" rel="noreferrer">View GitHub <ArrowIcon /></a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="code-card"><div className="code-card-top"><span /><span /><span /></div><pre><code><b>const</b> developer = {'{'}{`\n`}  name: <i>"Burhan"</i>,{`\n`}  focus: [<i>"React"</i>, <i>"Node.js"</i>],{`\n`}  builds: <i>"useful web experiences"</i>{`\n`}{'}'};</code></pre></div>
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        </div>
      </section>

      <section className="section about" id="about">
        <div className="section-heading"><p>01 / About</p><h2>Building practical software,<br />one thoughtful detail at a time.</h2></div>
        <div className="about-grid">
          <div className="about-copy">
            <p>I’m a Software Engineering graduate with hands-on experience developing web and software projects from interface to database. I enjoy turning requirements into responsive, user-friendly applications with clean and maintainable code.</p>
            <p>My interests span frontend and React development, full-stack systems, backend development, database integration, and learning modern software technologies that make products more useful.</p>
          </div>
          <div className="about-points">
            <div><span>01</span><p>Responsive, accessible interfaces</p></div><div><span>02</span><p>Frontend and backend integration</p></div><div><span>03</span><p>Practical database-driven projects</p></div><div><span>04</span><p>Continuous technical learning</p></div>
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="section-heading heading-row"><div><p>02 / Skills</p><h2>Tools I use to build.</h2></div><p className="section-note">A project-backed toolkit across web, backend, database, and mobile development.</p></div>
        <div className="top-skills">
          {["React.js", "JavaScript", "HTML & CSS", "Node.js / Express.js", "MongoDB"].map((skill, index) => <div className="top-skill" key={skill}><span>0{index + 1}</span><h3>{skill}</h3><i /></div>)}
        </div>
        <div className="skill-groups">
          {skillGroups.map((group) => <article key={group.label}><h3>{group.label}</h3><div>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="section-heading"><p>03 / Selected work</p><h2>Projects shaped by real<br />problems and practice.</h2></div>
        <article className="featured-project">
          <div className="project-index">01</div>
          <div className="featured-copy">
            <p className="project-label">Final Year Project · Featured</p><h3>SkillSwap — Skill Exchange Platform</h3>
            <p>SkillSwap is a skill exchange platform designed to allow users to share, discover, and exchange skills through a structured web-based system.</p>
            <div className="feature-list"><span>Account authentication & onboarding</span><span>Skill-based partner discovery</span><span>Real-time chat & session scheduling</span><span>Points-based skill exchange</span></div>
            <div className="project-tags"><span>React</span><span>Tailwind CSS</span><span>Flask</span><span>Socket.IO</span><span>MySQL / SQLite</span></div>
            <a className="button button-primary" href="https://github.com/muhammadburhan6/fyp-skillswap2026" target="_blank" rel="noreferrer">View repository <ArrowIcon /></a>
          </div>
          <div className="project-art" aria-hidden="true"><div className="swap-mark"><span>SKILL</span><b>⇄</b><span>SWAP</span></div><p>Learn. Teach. Exchange.</p></div>
        </article>
        <div className="project-grid">
          {projects.map((project) => <article className="project-card" key={project.name}><div className="project-card-top"><span>{project.number}</span><i>Academic / Personal</i></div><h3>{project.name}</h3><p>{project.description}</p><div className="project-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></article>)}
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="section-heading heading-row"><div><p>04 / Development journey</p><h2>Learning by building.</h2></div><p className="section-note">Project experience across the software development lifecycle—without presenting academic work as employment.</p></div>
        <div className="journey-list">{journey.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section education-section" id="education">
        <div className="section-heading"><p>05 / Education</p><h2>Academic foundation.</h2></div>
        <div className="education-card"><div className="edu-mark">UMT</div><div><p>Degree</p><h3>BS Software Engineering</h3><span>University of Management and Technology (UMT), Lahore</span></div></div>
        <div className="activities"><h3>Activities &amp; focus</h3><div><span>Final Year Project — SkillSwap</span><span>Software Engineering Projects</span><span>Web Development Activities</span><span>University Technology &amp; Programming Activities</span><span>Team-Based Software Development</span></div></div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy"><p>06 / Contact</p><h2>Let’s build something<br /><em>together.</em></h2><span>Have an internship, junior developer opportunity, or project in mind? Use the form to prepare your message.</span><a href="https://github.com/muhammadburhan6" target="_blank" rel="noreferrer">github.com/muhammadburhan6 <ArrowIcon /></a></div>
        <form onSubmit={handleSubmit} noValidate={false}>
          <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" minLength={2} required /></label>
          <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label>Message<textarea name="message" placeholder="Tell me about the opportunity or project" minLength={10} rows={5} required /></label>
          <button className="button button-primary" type="submit">Send Message <span>↗</span></button>
          {formNote && <p className="form-note" role="status">{formNote}</p>}
        </form>
      </section>

      <footer><a className="brand" href="#home">MBS<span>.</span></a><p>Muhammad Burhan Shariq · Frontend / Full-Stack Web Developer</p><a href="https://github.com/muhammadburhan6" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a></footer>
    </main>
  );
}
