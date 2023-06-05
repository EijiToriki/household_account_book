import hashlib

# digest
def get_digest(password):
    pwd = bytes(password, 'utf-8')
    digest = hashlib.sha256(pwd).hexdigest()
    return digest