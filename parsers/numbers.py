import httpx
import bs4

page_prefix = "cijfers"


def parse_details_component(html_content):
    meta_data = {}
    for i in html_content.findAll("div", class_="form-group"):
        key = i.find("strong").text.strip()
        meta_data[key] = {}
        keys = i.findAll("div", class_="col-xs-7")
        values = i.findAll("div", class_="col-xs-5")
        for k, v in zip(keys, values):
            k, v = k.text.strip(), v.text.strip()
            meta_data[key][k] = v

    return meta_data


def parse_facts_component(html_content):
    meta_data = {}
    elem = html_content.find("ol", class_="chart")
    meta_data[html_content.find("strong").text.strip()] = [
        i.text.strip() for i in elem.findAll("li")
    ]
    elem_2 = html_content.findAll("div", class_="form-group")[1]
    meta_data[elem_2.find("strong").text.strip()] = [
        i.text.strip() for i in elem_2.findAll("li")
    ]


def parse_short_term_improvements_component(html_content):
    tag = "Korte termijn verbeteringen"
    return html_content.text.strip()


def parse_numbers_page(link):
    with open("numbers.html", "r") as f:
        soup = bs4.BeautifulSoup(f.read(), "lxml")
        info_index = soup.find(
            "div", attrs={"id": page_prefix}, class_="profile-columns"
        )

        categories = list(
            map(lambda x: x.text.strip(), info_index.findAll("h3"))
        )

        rows_info = info_index.findAll("div", class_="col-sm-4")

        meta_data = {k: v for k, v in zip(categories, rows_info)}

        # parse_details_component(meta_data["Details"])

        # parse_facts_component(meta_data["Feiten"])
        parse_short_term_improvements_component(
            meta_data["Korte termijn verbeteringen"]
        )


parse_numbers_page(1)
