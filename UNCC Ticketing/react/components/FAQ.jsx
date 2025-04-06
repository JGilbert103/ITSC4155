import React from 'react';
import '../css/faq.css';
import { NavLink } from 'react-router-dom';

export const FAQ = () => {
  return (
    <>
    <section id="main">
    <div className="container">
        <div className="page">
            <h1 className="page-title">Niner Maintenance FAQ</h1>
            <div className="page-body">
                <details className="details">
                  <summary>How do I submit a maintenance request?</summary>
                  <p>Navigate to the <NavLink to="/userportal">User Portal</NavLink> tab, to submit a ticket. </p>
                </details>
                <details className="details">
                <summary>Where do I see the tickets I have submitted?</summary>
                <p>Ticket submissions will be found in your <NavLink to="/userportal">User Portal</NavLink>.</p>
                </details>
                <details className="details">
                <summary>What if I have an emergency?</summary>
                <p>If there is an emergency contact <a href="tel:911">911</a> or campus police at <a href="tel:704‑687‑2200">704‑687‑2200</a>.</p>
                </details>
            </div>
        </div>
    </div>
    </section>
    </>
  )
}
