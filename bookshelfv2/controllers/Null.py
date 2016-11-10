
import pecan


class NullController(object):
    def __init__(self, *args, **kws):
        pass

    @pecan.expose()
    def index(self):
        return dict()


