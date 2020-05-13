import httpx
import os
from alive_progress import alive_bar
import bs4
import asyncio
from utils import newlines_to_sentences, prettify, normalize_text

client = httpx.AsyncClient(timeout=300)
page_prefix = "cijfers"


async def parse_details_component(html_content):
    meta_data = {}
    for i in html_content.findAll("div", class_="form-group"):
        key = i.find("strong").text.strip()
        meta_data[key] = {}
        keys = i.findAll("div", class_="col-xs-7")
        values = i.findAll("div", class_="col-xs-5")
        for k, v in zip(keys, values):
            k, v = k.text.strip(), v.text.strip()
            meta_data[key][k] = v
    text = ""
    for k, v in meta_data.items():
        k = normalize_text(k)
        text += f"<{k}>"
        for k1, v1 in v.items():
            k1 = normalize_text(k1)
            text += f"<{k1}>{v1}</{k1}>"
        text += f"</{k}>"

    return prettify(text, "details")


async def parse_facts_component(html_content):
    meta_data = {}
    elem = html_content.find("ol", class_="chart")

    meta_data[html_content.find("strong").text.strip()] = [
        i.text.strip() for i in elem.findAll("li")
    ]

    elem_2 = html_content.findAll("div", class_="form-group")[1]

    meta_data[elem_2.find("strong").text.strip()] = [
        i.text.strip() for i in elem_2.findAll("li")
    ]

    text = ""
    for k, v in meta_data.items():
        k = normalize_text(k)
        text += f"<{k}>"
        for i in v:
            if not i:
                continue
            text += "<value>"
            text += f"{i}"
            text += "</value>"
        text += f"</{k}>"

    return prettify(text, "facts")


async def parse_short_term_improvements_component(html_content):
    heading = "short_term_improvements"
    xml_data = newlines_to_sentences(html_content.text.strip())
    return prettify(f"<{heading}>{xml_data}</{heading}>", "short_term_improvements")


async def parse_numbers_page(link):
    try:
        resp = await client.get(f"{link}/{page_prefix}.html")
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        info_index = soup.find(
            "div", attrs={"id": page_prefix}, class_="profile-columns"
        )

        categories = list(map(lambda x: x.text.strip(), info_index.findAll("h3")))

        rows_info = info_index.findAll("div", class_="col-sm-4")

        meta_data = {k: v for k, v in zip(categories, rows_info)}

        details_info = await parse_details_component(meta_data["Details"])
        facts_info = await parse_facts_component(meta_data["Feiten"])
        sti_info = await parse_short_term_improvements_component(
            meta_data["Korte termijn verbeteringen"]
        )
        return prettify(f"{details_info}\n{facts_info}\n{sti_info}\n", "numbers")
    except Exception as e:
        print(e)


async def main(links):
    total_links = len(links)
    with alive_bar(total_links) as bar:
        data = await asyncio.gather(
            *[parse_numbers_page(url.strip(), progress=bar) for url in links]
        )
        for link_num, info in enumerate(data):
            if not info:
                continue
            folder_name = links[link_num].split("/")[-1]
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)

            os.chdir(folder_name)

            with open("02 - " + __file__.replace(".py", ".xml"), "w") as f:
                f.write(info)
            os.chdir("..")


if __name__ == "__main__":
    with open("links.txt", "r") as f:
        asyncio.run(main(f.readlines()))
