import logging
from colorlog import ColoredFormatter
from datetime import datetime

def configureLogger(name=__name__, level=logging.INFO):
    logg = logging.getLogger(name)
    logg.setLevel(level)

    consoleWorker = logging.StreamHandler()
    consoleWorker.setLevel(level)

    logFormat = datetime.now().strftime("%H:%M:%S")
    logFormat += ' [%(name)s]: %(log_color)s%(levelname)s%(reset)s - %(message)s'
    formatter = ColoredFormatter(logFormat)
    consoleWorker.setFormatter(formatter)

    logg.addHandler(consoleWorker)

    return logg