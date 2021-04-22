-- Queries to get JSON FORMAT

SELECT json_build_object('appartmentNo' : Users.apartmentNo,'email' : Users.email ) FROM Users;
