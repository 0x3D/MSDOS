--- Insert tables into postgres 
CREATE TABLE Logins(
    email TEXT PRIMARY KEY,
    password TEXT NOT NULL
);

CREATE TABLE Users(
    apartmentNo INTEGER NOT NULL,
    email TEXT PRIMARY KEY,
    FOREIGN KEY (email) REFERENCES Logins(email)
);

CREATE TABLE Admins(
    email TEXT PRIMARY KEY,
    FOREIGN KEY (email) REFERENCES Logins(email)
);

