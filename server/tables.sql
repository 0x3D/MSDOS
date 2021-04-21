--- Insert tables into postgres 
CREATE TABLE Logins(
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

CREATE TABLE Users(
    apartmentNo INTEGER NOT NULL UNIQUE,
    email TEXT PRIMARY KEY,
    FOREIGN KEY (email) REFERENCES Logins(email),
);

CREATE TABLE Admins(
    email TEXT PRIMARY KEY,
    FOREIGN KEY (email) REFERENCES Logins(email)
);

