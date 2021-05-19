CREATE TABLE Users(
    apartment_no INTEGER PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    id INTEGER NOT NULL,
    role TEXT NOT NULL,
    CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    CONSTRAINT valid_role CHECK (role IN('user','admin')),
    CONSTRAINT password_length CHECK (char_length(password) > 4),
    CONSTRAINT positive_id CHECK (id > 0)
);

CREATE TABLE LaundryBookings(
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    apartment_no INTEGER NOT NULL,
    id INTEGER NOT NULL,
    PRIMARY KEY(start_time,end_time),
    FOREIGN KEY (apartment_no) REFERENCES Users (apartment_no),
    CONSTRAINT start_before_end CHECK (start_time < end_time),
    CONSTRAINT positive_id CHECK (id > 0)
);

CREATE TABLE GymBookings(
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    apartment_no INTEGER NOT NULL,
    id INTEGER NOT NULL,
    PRIMARY KEY(start_time,end_time),
    FOREIGN KEY (apartment_no) REFERENCES Users (apartment_no),
    CONSTRAINT start_before_end CHECK (start_time < end_time),
    CONSTRAINT positive_id CHECK (id > 0)
);

CREATE TABLE RoomBookings(
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    apartment_no INTEGER NOT NULL,
    id INTEGER NOT NULL,
    PRIMARY KEY(start_time,end_time),
    FOREIGN KEY (apartment_no) REFERENCES Users (apartment_no),
    /* CONSTRAINT start_before_end CHECK (start_time < end_time), Doesnt work
       same time for both*/
    CONSTRAINT positive_id CHECK (id > 0)
);

CREATE TABLE Facilities(
    name TEXT PRIMARY KEY
);
