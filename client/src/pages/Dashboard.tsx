import React from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="db-app">
            <aside className="db-sidebar">
                <div className="db-logo">Donezo</div>
                <nav className="db-menu">
                    <button className="active">Dashboard</button>
                    <button>Tasks</button>
                    <button>Calendar</button>
                    <button>Analytics</button>
                    <button>Team</button>
                </nav>
                <div className="db-cta">Download our Mobile App</div>
            </aside>

            <main className="db-main">
                <header className="db-header">
                    <div className="db-search">
                        <input placeholder="Search task" />
                    </div>
                    <div className="db-header-right">
                        <button className="icon">🔔</button>
                        <div className="user">
                            <div className="avatar">TM</div>
                            <div className="user-info">
                                <div className="name">Totok Michael</div>
                                <div className="email">tmichael20@mail.com</div>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="db-content">
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-sub">Plan, prioritize, and accomplish your tasks with ease.</p>

                    <div className="cards-row">
                        <div className="card green">
                            <div className="card-title">Total Projects</div>
                            <div className="card-value">24</div>
                            <div className="card-note">Increased from last month</div>
                        </div>
                        <div className="card">
                            <div className="card-title">Ended Projects</div>
                            <div className="card-value">10</div>
                            <div className="card-note">Increased from last month</div>
                        </div>
                        <div className="card">
                            <div className="card-title">Running Projects</div>
                            <div className="card-value">12</div>
                            <div className="card-note">Increased from last month</div>
                        </div>
                        <div className="card">
                            <div className="card-title">Pending Project</div>
                            <div className="card-value">2</div>
                            <div className="card-note">On Discuss</div>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="panel analytics">
                            <h3>Project Analytics</h3>
                            <div className="analytics-chart">[chart]</div>
                        </div>

                        <div className="panel reminders">
                            <h3>Reminders</h3>
                            <p>Meeting with Arc Company</p>
                            <p>Time: 02:00 pm - 04:00 pm</p>
                            <button className="primary">Start Meeting</button>
                        </div>

                        <div className="panel projects">
                            <div className="panel-header">
                                <h3>Project</h3>
                                <button className="small">+ New</button>
                            </div>
                            <ul className="project-list">
                                <li>Develop API Endpoints <span className="due">Nov 26, 2024</span></li>
                                <li>Onboarding Flow <span className="due">Nov 28, 2024</span></li>
                                <li>Build Dashboard <span className="due">Nov 30, 2024</span></li>
                                <li>Optimize Page Load <span className="due">Dec 5, 2024</span></li>
                            </ul>
                        </div>

                        <div className="panel team">
                            <h3>Team Collaboration</h3>
                            <ul>
                                <li><span className="avatar small">A</span> Alexandra Deff <span className="tag">Completed</span></li>
                                <li><span className="avatar small">E</span> Edwin Adenike <span className="tag inprogress">In Progress</span></li>
                                <li><span className="avatar small">I</span> Isaac Oluwatemilorun <span className="tag pending">Pending</span></li>
                                <li><span className="avatar small">D</span> David Oshodi <span className="tag">In Progress</span></li>
                            </ul>
                        </div>

                        <div className="panel progress">
                            <h3>Project Progress</h3>
                            <div className="donut">41%</div>
                            <div className="legend">
                                <span className="dot completed"></span> Completed
                                <span className="dot inprogress"></span> In Progress
                                <span className="dot pending"></span> Pending
                            </div>
                        </div>

                        <div className="panel time">
                            <h3>Time Tracker</h3>
                            <div className="timer">01:24:08</div>
                            <div className="timer-controls">
                                <button className="control">⏸</button>
                                <button className="control stop">⏹</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;