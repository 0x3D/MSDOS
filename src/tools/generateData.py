import json;

logins = list()

admins = list()

users = list()


def genPassword(email):
    return email


def createLogin(email,no):
    login = {'email': email,
            'password': genPassword(email)}
    user = {'apartmentNo': no,
            'email':email,
            'password': email,
            'id': no,
            'role': 'user'}
    logins.append(login)
    users.append(user)
    if(no%7==0):
        admin = {'email':email}
        user['role']='admin'
        admins.append(admin)


def main():
    try:
        file = open('emails.txt', 'r')
    except OSError:
        raise
    for index,email in enumerate(file.readlines()):
        createLogin(email.rstrip("\n"),index)
    
    file.close
    with open('logins.json', "w") as f:
        f.write(json.dumps(logins))
    with open('users.json', "w") as f:
        f.write(json.dumps(users))
    with open('admins.json', "w") as f:
        f.write(json.dumps(admins))


main()