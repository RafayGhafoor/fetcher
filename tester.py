import httpx
import bs4

# link = "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden/bosn14dp770a/hardware-webshop-te-koop-aangeboden"

fn = "page.html"

page_categories = [
    "cijfers",
    "achter-de-schermen",
    "sterke-punten",
    "kansen",
    "extra-informatie",
]


# def get_info(link=link):
#     all_categories_links = [link] + [f"{i}.html" for i in page_categories]
#     for url in all_categories_links:
#         r = httpx.get(url)
#         soup = bs4.BeautifulSoup(r.content, 'lxml')
#         info_index = soup.findAll('div', class_="container")[1]
#         print(info_index.text)
#         input()

# get_info()


def parse_profiel_info():
    with open(fn, "r") as f:
        soup = bs4.BeautifulSoup(f.read(), "lxml")

        info_index = soup.find("div", attrs={"id": "profiel"}, class_="profile-columns")

        categories = list(map(lambda x: x.text, info_index.findAll("h3")))

        rows_info = info_index.findAll("div", class_="col-sm-4")

        meta_data = {k: v for k, v in zip(categories, rows_info)}

        print(meta_data["Details"])
        # for k, v in meta_data.items():
        #     print(k)
            # print(k,v)
            # if k == "Algemeen":
            #     rows_info = [
            #         list(map(lambda x: x.strip(), i.text.split(":")))
            #         for i in info_index.find("div", class_="col-sm-4").findAll(
            #             "div", class_="row"
            #         )
            #     ]

            #     for i in rows_info:
            #         k, v = i
            #         print(k, v)


parse_profiel_info()
