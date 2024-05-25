CREATE TABLE IF NOT EXISTS users (
    user_id UUID NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(124),
    PRIMARY KEY(user_id),
    UNIQUE (user_id)
);

CREATE TABLE IF NOT EXISTS payments (
    payment_id SERIAL NOT NULL,
    transaction_date TIMESTAMP NOT NULL DEFAULT now(),
    remote_transaction_id UUID NOT NULL DEFAULT gen_random_uuid(),
    ticket_id SERIAL NOT NULL,
    PRIMARY KEY (payment_id)
);

CREATE TABLE IF NOT EXISTS tickets (
    ticket_id SERIAL NOT NULL,
    purchase_date TIMESTAMP NOT NULL DEFAULT now(),
    number_of_seats INTEGER NOT NULL,
    status BOOLEAN NOT NULL,
    user_id UUID NOT NULL,
    show_id INTEGER NOT NULL,
    PRIMARY KEY (ticket_id)
);

CREATE TABLE IF NOT EXISTS shows (
    show_id SERIAL NOT NULL,
    date DATE NOT NULL,
    start_hour TIME NOT NULL,
    auditorium_id INTEGER NOT NULL,
    movie_id INTEGER NOT NULL,
    PRIMARY KEY (show_id)
);

CREATE TABLE IF NOT EXISTS show_seats (
    show_seat_id SERIAL NOT NULL,
    price REAL NOT NULL,
    auditorium_seat_id INTEGER NOT NULL,
    show_id INTEGER NOT NULL,
    ticket_id INTEGER NOT NULL,
    PRIMARY KEY (show_seat_id)
);

CREATE TABLE IF NOT EXISTS movies (
    movie_id INTEGER NOT NULL,
    title VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    release_date DATE NOT NULL,
    rating REAL NOT NULL,
    poster_path VARCHAR(256) NOT NULL,
    backdrop_path VARCHAR(256) NOT NULL,
    PRIMARY KEY (movie_id),
    UNIQUE (movie_id)
);

CREATE TABLE IF NOT EXISTS auditoriums (
    auditorium_id SERIAL NOT NULL,
    total_seats INTEGER NOT NULL,
    PRIMARY KEY (auditorium_id)
);

CREATE TABLE IF NOT EXISTS auditorium_seats (
    auditorium_seat_id SERIAL NOT NULL,
    seat_number SMALLINT NOT NULL,
    seat_row VARCHAR(1) NOT NULL,
    auditorium_id INTEGER NOT NULL,
    PRIMARY KEY (auditorium_seat_id)
);

ALTER TABLE payments
ADD CONSTRAINT FK_payments_ticket_id
FOREIGN KEY (ticket_id)
REFERENCES tickets(ticket_id);

ALTER TABLE tickets
ADD CONSTRAINT FK_tickets_user_id
FOREIGN KEY (user_id)
REFERENCES users(user_id);

ALTER TABLE tickets
ADD CONSTRAINT FK_tickets_show_id
FOREIGN KEY (show_id)
REFERENCES  shows(show_id);

ALTER TABLE show_seats
ADD CONSTRAINT FK_show_seats_auditorium_id
FOREIGN KEY (auditorium_seat_id)
REFERENCES auditorium_seats(auditorium_seat_id);

ALTER TABLE show_seats
ADD CONSTRAINT FK_show_seats_show_id
FOREIGN KEY (show_id)
REFERENCES shows(show_id);

ALTER TABLE show_seats
ADD CONSTRAINT FK_show_seats_ticket_id
FOREIGN KEY (ticket_id)
REFERENCES tickets(ticket_id);

ALTER TABLE auditorium_seats
ADD CONSTRAINT FK_auditorium_seats_auditorium_id
FOREIGN KEY (auditorium_id)
REFERENCES auditoriums(auditorium_id);

ALTER TABLE shows
ADD CONSTRAINT FK_shows_auditorium_id
FOREIGN KEY (auditorium_id)
REFERENCES auditoriums(auditorium_id);

ALTER TABLE shows
ADD CONSTRAINT FK_shows_movie_id
FOREIGN KEY (movie_id)
REFERENCES movies(movie_id);

