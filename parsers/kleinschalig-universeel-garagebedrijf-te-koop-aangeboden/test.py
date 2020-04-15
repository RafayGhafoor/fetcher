import os, bs4

files = [i for i in sorted(os.listdir(".")) if i.endswith(".xml")]
text = ""
with open("sample.xml", "a") as f:
    for num,i in enumerate(files,1):
        with open(i, "r") as z:
            text += f"<page_{num}>"
            text += z.read()
            text += f"</page_{num}>"

    soup = bs4.BeautifulSoup(text, "lxml")
    f.write(soup.prettify())
