import httpx
import bs4

page_prefix = "cijfers"

with open("numbers.html", "r") as f:
    soup = bs4.BeautifulSoup(f.read(), "lxml")
    info_index = soup.find(
        "div", attrs={"id": page_prefix}, class_="profile-columns"
    )

    categories = list(map(lambda x: x.text, info_index.findAll("h3")))

    rows_info = info_index.findAll("div", class_="col-sm-4")

    meta_data = {k: v for k, v in zip(categories, rows_info)}
    for k, v in meta_data.items():
        print(k, v)
        input()
