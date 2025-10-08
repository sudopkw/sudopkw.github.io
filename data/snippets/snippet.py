import random
import string

def gen_pwd(length=12):
    chars = string.ascii_letters + string.digits + "!@#$%^&*()"
    return ''.join(random.choice(chars) for _ in range(length))

print("Your random password is:", gen_pwd())
