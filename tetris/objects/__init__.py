# coding: utf-8
import time

FPS = 60

class ChronosMixin():
    def __init__(self):
        self.lastFrameTime = time.time()

    def wait(self):
        currentTime = time.time()
        dt = currentTime - self.lastFrameTime
        self.lastFrameTime = currentTime

        sleep_time = 1. / FPS - (currentTime - self.lastFrameTime)
        if sleep_time > 0:
            time.sleep(sleep_time)
