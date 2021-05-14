#! /bin/env/python3

inserts = list()

def create_inserts(email,no):
    if no%7==0:
        inserts.append(f"insert into users values ({no},'{email}','{email}',{no},'admin');")
    else:
        inserts.append(f"insert into users values ({no},'{email}','{email}',{no},'user');")


def main():
    try:
        file = open('emails.txt', 'r')
    except OSError:
        raise
    for index,email in enumerate(file.readlines()):
        create_inserts(email.rstrip("\n"),index+1)

    file.close
    with open('inserts.sql', "w") as f:
        f.write('\n'.join(inserts))


main()