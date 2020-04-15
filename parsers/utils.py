import bs4
import re


def normalize_text(text):
    return "_".join(re.findall("\w+", text))


def newlines_to_sentences(text):
    return ". ".join([i for i in text.split("\n") if i])


def prettify(text, tag):
    text = f"<{tag}>{text}</{tag}>"
    soup = bs4.BeautifulSoup(text, "lxml")
    return soup.find(tag).prettify()
