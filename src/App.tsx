import { type FormEvent, useState } from 'react';

type ClubEvent = {
  title: string;
  date: string;
  type: string;
  attendance: number;
  capacity: number;
  feedbackScore: number;
  tags: string[];
};

type ClubProfile = {
  name: string;
  kind: 'Club' | 'Project Team';
  overview: string;
  recruitingSeason: string;
  pastEvents: number;
  interests: string[];
  events: ClubEvent[];
};

const clubs: ClubProfile[] = [
  {
    name: 'Cornell AppDev',
    kind: 'Project Team',
    overview: 'Cornell AppDev is a student project team focused on building software products, collaborating across disciplines, and shipping real tools.',
    recruitingSeason: 'Fall semester',
    pastEvents: 20,
    interests: ['software', 'product', 'mobile', 'mentorship'],
    events: [
      {
        title: 'Fall Info Session',
        date: 'Sep 4',
        type: 'Info session',
        attendance: 155,
        capacity: 170,
        feedbackScore: 4.7,
        tags: ['software', 'recruiting', 'beginner-friendly']
      },
      {
        title: 'Portfolio and Resume Review Night',
        date: 'Sep 11',
        type: 'Workshop',
        attendance: 102,
        capacity: 125,
        feedbackScore: 4.5,
        tags: ['career', 'mentorship', 'software']
      },
      {
        title: 'Build Sprint Demo Night',
        date: 'Oct 2',
        type: 'Build session',
        attendance: 130,
        capacity: 150,
        feedbackScore: 4.8,
        tags: ['hackathons', 'teamwork', 'software']
      }
    ]
  },
  {
    name: 'Cornell Data Science',
    kind: 'Project Team',
    overview: 'Cornell Data Science is a project team that blends analytics, machine learning, and applied research on student-built projects.',
    recruitingSeason: 'Fall semester and Spring semester',
    pastEvents: 14,
    interests: ['data science', 'machine learning', 'analytics', 'research'],
    events: [
      {
        title: 'Info Session and Team Interest Night',
        date: 'Aug 30',
        type: 'Info session',
        attendance: 118,
        capacity: 140,
        feedbackScore: 4.2,
        tags: ['data science', 'analytics', 'recruiting']
      },
      {
        title: 'Modeling Workshop Night',
        date: 'Sep 14',
        type: 'Training',
        attendance: 86,
        capacity: 100,
        feedbackScore: 4.4,
        tags: ['machine learning', 'analytics', 'teamwork']
      },
      {
        title: 'Project Showcase Review',
        date: 'Oct 1',
        type: 'Mixer',
        attendance: 97,
        capacity: 115,
        feedbackScore: 4.6,
        tags: ['data science', 'research', 'project showcase']
      }
    ]
  },
  {
    name: 'Cayuga Healthcare Consulting',
    kind: 'Club',
    overview: 'Cayuga Healthcare Consulting is a Cornell club for students interested in healthcare strategy, consulting, and impact-driven problem solving.',
    recruitingSeason: 'Spring semester',
    pastEvents: 11,
    interests: ['healthcare', 'consulting', 'strategy', 'impact'],
    events: [
      {
        title: 'Info Session and Member Preview',
        date: 'Sep 9',
        type: 'Info session',
        attendance: 72,
        capacity: 90,
        feedbackScore: 4.9,
        tags: ['healthcare', 'consulting', 'recruiting']
      },
      {
        title: 'Case Prep Workshop',
        date: 'Sep 26',
        type: 'Workshop',
        attendance: 64,
        capacity: 80,
        feedbackScore: 4.6,
        tags: ['strategy', 'consulting', 'teamwork']
      },
      {
        title: 'Healthcare Case Night',
        date: 'Oct 8',
        type: 'Build session',
        attendance: 70,
        capacity: 82,
        feedbackScore: 4.7,
        tags: ['healthcare', 'case competition', 'impact']
      }
    ]
  },
  {
    name: 'Kappa Theta Pi',
    kind: 'Club',
    overview: 'Kappa Theta Pi is a preprofessional fraternity at Cornell that emphasizes career development, technical growth, and community.',
    recruitingSeason: 'Fall semester',
    pastEvents: 16,
    interests: ['professional development', 'software', 'networking', 'mentorship'],
    events: [
      {
        title: 'Rush Info Session',
        date: 'Sep 3',
        type: 'Info session',
        attendance: 140,
        capacity: 150,
        feedbackScore: 4.5,
        tags: ['professional development', 'recruiting', 'networking']
      },
      {
        title: 'Professional Skills Workshop',
        date: 'Sep 12',
        type: 'Workshop',
        attendance: 110,
        capacity: 130,
        feedbackScore: 4.4,
        tags: ['mentorship', 'networking', 'career']
      },
      {
        title: 'Member Panel Night',
        date: 'Sep 25',
        type: 'Panel',
        attendance: 95,
        capacity: 120,
        feedbackScore: 4.6,
        tags: ['professional development', 'community', 'networking']
      }
    ]
  }
];

function getEventSuccess(event: ClubEvent) {
  const attendanceRate = event.attendance / event.capacity;
  return attendanceRate >= 0.75 && event.feedbackScore >= 4.3;
}

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState<ClubProfile | null>(null);

  const activeClub = selectedClub && clubs.includes(selectedClub) ? selectedClub : null;

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const exactMatch = clubs.find((club) => club.name.toLowerCase() === query.trim().toLowerCase());
    const partialMatch = exactMatch ?? clubs.find((club) => club.name.toLowerCase().includes(query.trim().toLowerCase()));
    setSelectedClub(partialMatch ?? null);
  }

  function selectClub(club: ClubProfile) {
    setSelectedClub(club);
    setQuery(club.name);
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Big Red Club Analytics</p>
          <h1>See whether a Cornell campus organization event is worth your time.</h1>
          <p className="hero-copy">
            Search Cornell clubs or project teams, review activity level, check recruiting timing, and compare upcoming events against your interests.
          </p>
        </div>

        <form className="search-card" onSubmit={handleSearch}>
          <label htmlFor="club-search">Search a Cornell club or project team</label>
          <div className="search-row">
            <input
              id="club-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Cornell AppDev, Cornell Cup Robotics, or Cornell Sustainable Design"
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </header>

      <main className="content-grid">
        <section className="panel">
          <div className="panel-header">
            <h2>Popular Cornell Groups</h2>
            <span>4 groups</span>
          </div>

          <div className="club-list">
            {clubs.map((club) => (
              <button
                key={club.name}
                type="button"
                className={club === activeClub ? 'club-chip active' : 'club-chip'}
                onClick={() => selectClub(club)}
              >
                <strong>{club.name}</strong>
                <span>{club.kind} · {club.recruitingSeason}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel dashboard-panel">
          {activeClub ? (
            <>
              <div className="dashboard-title">
                <p className="eyebrow">Dashboard</p>
                <h2>{activeClub.name}</h2>
              </div>

              <div className="overview-block">
                <span>Overview</span>
                <p>{activeClub.overview}</p>
              </div>

              <div className="stats-grid compact-grid">
                <article>
                  <span>Recruiting season</span>
                  <p>{activeClub.recruitingSeason}</p>
                </article>
                <article>
                  <span>Past events</span>
                  <p>{activeClub.pastEvents}</p>
                </article>
                <article>
                  <span>Student fit</span>
                  <p>{activeClub.interests.join(' · ')}</p>
                </article>
              </div>

              <div className="upcoming-block">
                <h3>Upcoming events</h3>
                <div className="event-list">
                  {activeClub.events.map((event) => {
                    const successful = getEventSuccess(event);
                    return (
                      <article key={event.title} className="event-card">
                        <div className="event-topline">
                          <strong>{event.title}</strong>
                          <span>{event.date}</span>
                        </div>
                        <p>{event.type}</p>
                        <div className="metric-row">
                          <span>Attendance: {event.attendance}/{event.capacity}</span>
                          <span>Feedback: {event.feedbackScore.toFixed(1)}/5</span>
                        </div>
                        <div className={successful ? 'success-tag' : 'success-tag muted'}>
                          {successful ? 'Successful past event pattern' : 'Mixed past event results'}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h2>Search a Cornell group to load analytics</h2>
              <p>The dashboard appears after you search or select a Cornell club or project team.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
