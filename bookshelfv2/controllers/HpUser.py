
import ldap
from pecan import expose


def ldap_search(eid):
    ldapobj = ldap.initialize('ldap://ldap.hp.com:389')
    ldap.protocol_version = ldap.VERSION3

    rid = ldapobj.search(
        'ou=People,o=hp.com', 
        ldap.SCOPE_SUBTREE,
        '(employeeNumber=%s)' % eid,
        None)

    r_type, r_data = ldapobj.result(rid, 0)
    if r_type == ldap.RES_SEARCH_ENTRY:
        return r_data[0][1]
    else:
        return dict()


class UserItemController(object):
    def __init__(self, eid):
        self.user = ldap_search(eid)

    # HTTP GET <id>
    @expose('json', generic=True)
    def index(self):
        return self.user


class HpUserController(object):
    @expose()
    def _lookup(self, eid, *remainder):
        try:
            return UserItemController(eid), remainder
        except AssertionError:
            return dict()
        except StopIteration:
            return dict()

    @expose(generic=True, template='json')
    def index(self):
        return dict()

    @expose('error.html')
    def error(self, status):
        try:
            status = int(status)
        except ValueError:  # pragma: no cover
            status = 500
        message = getattr(status_map.get(status), 'explanation', '')
        return dict(status=status, message=message)
