CREATE DATABASE Niner;
USE tickets;

CREATE TABLE tickets(
    id integer PRIMARY KEY AUTO_INCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    problem TEXT NOT NULL,
    building TEXT NOT NULL,
    location TEXT NOT NULL,
    updates BOOLEAN,
    photo TEXT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

/*
INSERT INTO requests (username, issue, building, created)
VALUES
('John Smith', 'Bathroom sink is broken', 'Cato'),
('Terry Johnson', 'Room outlet does not work', 'CHHS'),
('Sarah Paulson', 'Printer out of ink', 'Fretwell');
;
*/