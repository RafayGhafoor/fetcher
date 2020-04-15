import os, bs4

files = [i for i in sorted(os.listdir(".")) if i.endswith(".xml")]
text = ""
with open("sample.xml", "a") as f:
    for i in files:
        with open(i, "r") as z:
            text += z.read()

    soup = bs4.BeautifulSoup(text, "lxml")
    f.write(soup.prettify())
