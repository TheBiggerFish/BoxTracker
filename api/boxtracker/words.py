import random

import requests

_ADJECTIVE_LIST_URL = 'https://gist.githubusercontent.com/TheBiggerFish/3e185798b85b595ee81a07f536a2fbaa/raw/1ae9104970ef4c041c53ea00791a3635bea695ec/english-adjectives.txt'
_NOUN_LIST_URL = 'https://gist.githubusercontent.com/TheBiggerFish/71a789aa29662dd0e1cbc6f8b7a2acad/raw/a4ddc508e6b7ef76271bf2bab08a7a84e9770155/english-nouns.txt'

ADJECTIVE_LIST = list(filter(lambda word: len(word) > 5,
                             requests.get(_ADJECTIVE_LIST_URL).text.split()))
NOUN_LIST = list(filter(lambda word: len(word) > 5,
                        requests.get(_NOUN_LIST_URL).text.split()))


def get_pair() -> str:
    adj = random.choice(ADJECTIVE_LIST)
    noun = random.choice(NOUN_LIST)
    return f'{adj}_{noun}'
