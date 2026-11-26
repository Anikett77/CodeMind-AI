"use client";

import { useState } from "react";
import ParticleField from "../components/ParticleField";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const NAV = [
  ["Work", "#work"],
  ["Services", "#services"],
  ["Process", "#process"],
  ["Analytics", "#analytics"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

const PRODUCTS = [
  ["Repo Mapper", "Maps every folder, module and entry point so you see the shape of a project at a glance."],
  ["Semantic Search", "Finds code by meaning, not just keywords, using embeddings across your source files."],
  ["Context Chat", "Ask questions in plain language and get answers grounded in your own code."],
  ["Source Trace", "Every answer links back to the exact files and line ranges that support it."],
];

const SERVICES = [
  ["01", "Codebase Exploration", "Navigate files and understand the structure of any public GitHub repository.", "learning"],
  ["02", "Contextual Questions", "Ask about your project and retrieve the relevant code using semantic search.", "architecture"],
  ["03", "Source-backed Answers", "Trace answers to the files and line ranges behind them.", "protection"],
  ["04", "Smart Indexing", "Chunk, embed and index repositories automatically as they grow.", "growth"],
];

const STEPS = [
  ["Step 1 — Connect", "Paste a public GitHub URL. codemind scans the tree and selects the source files worth reading.", "30 sec", "Average connection time"],
  ["Step 2 — Index", "Files are chunked and embedded so the whole repository becomes searchable.", "2 min", "Average index time"],
  ["Step 3 — Ask", "Ask anything about the code and get answers with file and line references.", "3 sec", "Average answer time"],
];

const STATS = [
  ["10M+", "Lines indexed"], ["500K+", "Files searched"], ["1B+", "Tokens processed"],
  ["200+", "Repositories explored"], ["3s", "Average answer time"], ["89%", "Faster onboarding"],
];

const PLANS = [
  { name: "Hobby", tag: "For side projects", m: 0, feats: ["3 repositories", "Semantic search", "Context chat", "Community support"] },
  { name: "Pro", tag: "For growing teams", m: 19, feats: ["Everything in Hobby", "25 repositories", "Source trace", "Priority indexing", "Email support"] },
  { name: "Team", tag: "For larger orgs", m: 59, feats: ["Everything in Pro", "Unlimited repositories", "Private repos", "Shared workspaces", "24/7 support"] },
];

const FAQS = [
  ["What exactly is codemind AI?", "A tool that connects to a GitHub repository, indexes its source code and lets you ask questions about it."],
  ["How does it answer questions?", "It retrieves the most relevant code with semantic search, then an LLM answers using only that code as context."],
  ["How long does indexing take?", "Small repositories are ready in under a minute. Larger ones take a few minutes."],
  ["Does it support private repositories?", "Right now it works with public repositories. Private repo support is planned."],
  ["Can I trust the answers?", "Every answer links to the files and line ranges it came from, so you can verify it yourself."],
];

const TEAM = [
  ["Aniket Chaturvedi", "Founder & Full Stack Developer", "I build AI-powered web apps with MERN, Next.js and LLM APIs, and made codemind to make unfamiliar code easier to read."],
  ["Core Engine", "Indexing & Retrieval", "Handles file selection, chunking, embeddings and semantic search behind every answer."],
];

const REVIEWS = [
  ["It cut my onboarding time on a new repo from days to an afternoon.", "Early user", "Student developer"],
  ["The line-level references make the answers actually trustworthy.", "Early user", "Open-source contributor"],
];

const POSTS = [
  ["Why source-backed answers matter", "Ground every AI answer in code you can open and check."],
  ["Semantic search for codebases", "How embeddings find the right function without the right keyword."],
  ["Reading a repo in ten minutes", "A workflow for getting oriented in unfamiliar code."],
];

export default function Home() {
  const [githubUrl, setGithubUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [repository, setRepository] = useState(null);
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [question, setQuestion] = useState("");
const [chatLoading, setChatLoading] = useState(false);
const [chatMessages, setChatMessages] = useState([]);

  async function handleConnect(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setRepository(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/repositories/index`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ github_url: githubUrl.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Unable to connect to this repository.");
      setRepository(data);
      setMessage("Repository connected successfully.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message || "Something went wrong. Please check your backend connection.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleAskQuestion(event) {
  event.preventDefault();

  if (!repository?.repository_id || !question.trim()) return;

  const currentQuestion = question.trim();

  setChatLoading(true);
  setQuestion("");

  setChatMessages((previous) => [
    ...previous,
    {
      role: "user",
      content: currentQuestion,
    },
  ]);

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/repositories/${repository.repository_id}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to get an answer.");
    }

    setChatMessages((previous) => [
      ...previous,
      {
        role: "assistant",
        content: data.answer,
        sources: data.sources || [],
      },
    ]);
  } catch (error) {
    setChatMessages((previous) => [
      ...previous,
      {
        role: "assistant",
        content: `Error: ${error.message}`,
        sources: [],
      },
    ]);
  } finally {
    setChatLoading(false);
  }
}

  const Head = ({ kicker, num, title, sub }) => (
    <header className="sec-head">
      <div className="sec-kicker"><span>{kicker}</span><span>{num}</span></div>
      <h2 className="sec-title">{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </header>
  );

  return (
    <main className="site-shell">
      <ParticleField />
      <div className="aurora" aria-hidden="true" />

      <nav className="navbar">
        <a href="#" className="brand">code<span className="brand-mind">mind</span><sup>AI</sup></a>
        <div className="nav-links">
          {NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
        </div>
        <a href="#connect" className="btn">Connect Repository</a>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-note">Understand your code,<br />without the complexity.</div>

        <div className="hero-content">
          <h1 className="hero-title">
            You explore, we explain. <span className="accent">The smarter way to</span> read, search and build with code.
          </h1>

          <div className="hero-subtitle">
            <div>
              <h2>See codemind in action</h2>
              <p>Connect a GitHub repository and discover<br />what is happening inside your code.</p>
            </div>
            <div className="subtitle-line" />
            <a href="#process" className="btn">How it works ↗</a>
          </div>

          <div id="connect">
            <form className="github-form" onSubmit={handleConnect}>
              <input type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repository" aria-label="GitHub repository URL" required />
              <button type="submit" disabled={loading}>{loading ? "Connecting..." : "Connect GitHub ↗"}</button>
            </form>

            {message && <p className={`form-message ${messageType}`} role="status">{message}</p>}

            {repository && (
  <div className="repository-result">
    <div className="repository-result-heading">
      <span className="result-dot" />
      Repository indexed successfully
    </div>

    <h3>{repository.repository}</h3>

    <div className="repository-result-stats">
      <div>
        <strong>{repository.files_downloaded}</strong>
        <span>Files downloaded</span>
      </div>

      <div>
        <strong>{repository.total_documents}</strong>
        <span>Documents</span>
      </div>

      <div>
        <strong>{repository.total_chunks}</strong>
        <span>Chunks indexed</span>
      </div>
    </div>

    <p className="form-message success">
      Your repository is ready for AI-powered exploration.
    </p>
  </div>
)}

{repository && (
  <div className="chat-panel">
    <div className="chat-heading">
      <div>
        <span className="section-kicker">CODEBASE CONVERSATION</span>
        <h2>Ask your repository.</h2>
      </div>
      <span className="chat-status">● Connected</span>
    </div>

    <div className="chat-messages">
      {chatMessages.length === 0 && (
        <div className="chat-empty">
          <span>01 / START EXPLORING</span>
          <h3>What would you like to understand?</h3>
          <p>
            Ask about authentication, APIs, database connections,
            application flows, or anything in your codebase.
          </p>
        </div>
      )}

      {chatMessages.map((item, index) => (
        <div className={`chat-message ${item.role}`} key={index}>
          <span className="chat-role">
            {item.role === "user" ? "YOU" : "CODEMIND"}
          </span>

          <p>{item.content}</p>

          {item.sources?.length > 0 && (
            <div className="chat-sources">
              <span>SOURCE REFERENCES</span>

              {item.sources.map((source, sourceIndex) => (
                <div className="source-item" key={sourceIndex}>
                  <code>{source.file_path}</code>
                  <small>
                    Lines {source.start_line}–{source.end_line}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {chatLoading && (
        <div className="chat-thinking">
          <span className="thinking-dot" />
          Searching your codebase and preparing an answer...
        </div>
      )}
    </div>

    <form className="chat-form" onSubmit={handleAskQuestion}>
      <input
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        placeholder="Ask anything about this repository..."
        disabled={chatLoading}
        required
      />

      <button type="submit" disabled={chatLoading || !question.trim()}>
        {chatLoading ? "Thinking..." : "Ask ↗"}
      </button>
    </form>
  </div>
)}
          </div>

          <div className="stats">
            <div className="stat"><div className="stat-number">99.9<small>%</small></div><div className="stat-label"><strong>Uptime</strong><span>30-day monitoring</span></div></div>
            <div className="stat"><div className="stat-number">+10.9<small>%</small></div><div className="stat-label"><strong>Accuracy</strong><span>Retrieval-tuned answers</span></div></div>
          </div>
        </div>

        <div className="floating-card">
          <div className="floating-visual"><div className="visual-core" /><div className="orb" /></div>
          <div className="floating-info">
            <div><strong>Neural Search</strong><span>// Latest release</span></div>
            <b>↗</b>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>Your codebase, streamlined for growth. ✦ The smarter way to read, search and build. ✦ Understand more. ✦&nbsp;</span>
          ))}
        </div>
      </div>

      {/* Work */}
      <section className="section" id="work">
        <Head kicker="Our Work" num="001" title={<>Designed with purpose, <span>built to help you move faster.</span></>}
          sub="Every feature solves a real problem, delivering practical value over mere aesthetics." />
        <div className="feature-grid four">
          {PRODUCTS.map(([t, d], i) => (
            <article className="feature-card" key={t}>
              <span className="feature-index">{String(i + 1).padStart(2, "0")} / {PRODUCTS.length}</span>
              <h3>{t}</h3><p>{d}</p>
            </article>
          ))}
        </div>
        <div className="beta-card">
          <div><span className="chip">Neural Core 4.0b</span><h3>Early beta access now available.</h3></div>
          <div className="progress-wrap">
            <div className="progress-label"><span>Development progress</span><b>78%</b></div>
            <div className="progress"><i style={{ width: "78%" }} /></div>
          </div>
          <a href="#connect" className="btn">Join early beta</a>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <Head kicker="Our Services" num="002" title={<>Flexible tools for <span>understanding modern code.</span></>}
          sub="Future-proof systems that scale with your repository." />
        <div className="service-list">
          {SERVICES.map(([n, t, d, tag]) => (
            <article className="service-row" key={n}>
              <span className="service-n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="tag">{tag}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="section" id="process">
        <Head kicker="Our Process" num="003" title={<>Optimized workflow, <span>from repository to real understanding.</span></>}
          sub="Seamless from first URL to final answer." />
        <div className="process-row">
          {STEPS.map(([t, d, big, small]) => (
            <article className="process-item" key={t}>
              <span>{t}</span>
              <p>{d}</p>
              <div className="process-stat"><strong>{big}</strong><em>{small}</em></div>
            </article>
          ))}
        </div>
      </section>

      {/* Analytics */}
      <section className="section" id="analytics">
        <Head kicker="Smart Analytics" num="004" title={<>Real-time metrics, <span>actionable insight.</span></>}
          sub="System health and performance at a glance." />
        <div className="analytics-grid">
          <div className="panel">
            <h4>System Health</h4>
            <div className="bar-stack">
              <i style={{ width: "66%" }} className="b1" /><i style={{ width: "25%" }} className="b2" /><i style={{ width: "9%" }} className="b3" />
            </div>
            <div className="legend"><span>66% Optimal</span><span>25% Stable</span><span>9% Issues</span></div>
            {[["Amsterdam", "24ms → 11ms"], ["New York", "37ms → 19ms"], ["Dubai", "Adjusting"]].map(([c, v]) => (
              <div className="row-line" key={c}><span>{c}</span><b>{v}</b></div>
            ))}
          </div>
          <div className="panel">
            <h4>System Evolution <small>Score 86 / 100</small></h4>
            {[["Integration", 38], ["Efficiency", 79], ["Security", 92], ["Scaling", 84], ["Uptime", 98]].map(([k, v]) => (
              <div className="meter" key={k}><span>{k}</span><div><i style={{ width: v + "%" }} /></div><b>{v}%</b></div>
            ))}
          </div>
          <div className="panel stats-panel">
            {STATS.map(([n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" id="pricing">
        <Head kicker="Pricing" num="005" title={<>Flexible, transparent plans. <span>Built for clarity and growth.</span></>}
          sub="Choose only what you need, when you need it. Nothing locked in." />
        <div className="toggle">
          <button className={!yearly ? "on" : ""} onClick={() => setYearly(false)}>Monthly</button>
          <button className={yearly ? "on" : ""} onClick={() => setYearly(true)}>Yearly · save 16%</button>
        </div>
        <div className="feature-grid">
          {PLANS.map((p) => {
            const price = yearly ? Math.round(p.m * 0.84) : p.m;
            return (
              <article className="feature-card plan" key={p.name}>
                <span className="feature-index">{p.tag}</span>
                <h3>{p.name}</h3>
                <div className="price">${price}<small>/mo</small></div>
                <ul>{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
                <a href="#connect" className="btn">Select plan</a>
              </article>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <Head kicker="Questions & Answers" num="006" title={<>Simple answers to <span>help you move faster.</span></>} />
        <div className="faq">
          {FAQS.map(([q, a], i) => (
            <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={q}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                {q}<span>{openFaq === i ? "−" : "+"}</span>
              </button>
              <div className="faq-body"><p>{a}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section" id="team">
        <Head kicker="Meet the Team" num="007" title={<>Makers, thinkers <span>and problem-solvers.</span></>}
          sub="We focus on clear decisions and getting things done right." />
        <div className="feature-grid two">
          {TEAM.map(([n, r, b]) => (
            <article className="feature-card" key={n}>
              <div className="avatar">{n[0]}</div>
              <h3>{n}</h3><span className="feature-index">{r}</span><p>{b}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" id="reviews">
        <Head kicker="What Our Users Say" num="008" title={<>Trusted by developers <span>who value speed and clarity.</span></>} />
        <div className="feature-grid two">
          {REVIEWS.map(([q, n, r]) => (
            <article className="feature-card quote" key={q}>
              <p>“{q}”</p><strong>{n}</strong><span className="feature-index">{r}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Labs */}
      <section className="section" id="labs">
        <Head kicker="codemind Labs" num="009" title={<>Fresh takes on code, <span>search and AI tooling.</span></>} />
        <div className="feature-grid">
          {POSTS.map(([t, d]) => (
            <article className="feature-card" key={t}><span className="feature-index">Article</span><h3>{t}</h3><p>{d}</p></article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta">
        <h2 className="section-big">Where understanding your code gets <span>simple.</span></h2>
        <a href="#connect" className="btn big">Let's talk ↗</a>
      </section>

      <footer className="footer">
        <a href="#" className="brand">code<span className="brand-mind">mind</span><sup>AI</sup></a>
        <span>Built for developers who want to understand more.</span>
        <span>© 2026 codemind AI</span>
        <a href="#connect">Connect a repository ↗</a>
      </footer>
    </main>
  );
}