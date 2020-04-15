"""
    Parser for profile page components.

    Profile page is composed of three components
    i.e., Algemeen (General), Details, Extra informatie (Extra Information)
"""
from alive_progress import alive_bar
import time
import aiofiles
import httpx
import bs4
import asyncio
import re

client = httpx.AsyncClient(timeout=300)


async def parse_general_component(html_content):
    info = {}
    general_component_info = html_content.findAll("div", class_="row")

    for tags in general_component_info:
        heading, value = list(map(lambda x: x.strip(), tags.text.split(":")))
        info[heading] = value

    return info


async def parse_details_component(html_content):
    description = html_content.find("p").text.strip().split("\n")[0]

    headings_info = {}

    for i in html_content.findAll("b"):
        headings_info[i.text.strip()] = i.next_sibling.strip()

    preferred_buyers = {
        html_content.find("strong").text.strip(): [
            i.next_sibling.strip() for i in html_content.findAll("i")
        ]
    }

    return {
        "description": description,
        "headings_info": headings_info,
        "preferred_buyers": preferred_buyers,
    }


async def parse_profile_page_info(link, progress):
    try:
        resp = await client.get(link)

        soup = bs4.BeautifulSoup(resp.content, "lxml")

        info_index = soup.find(
            "div", attrs={"id": "profiel"}, class_="profile-columns"
        )

        categories = list(map(lambda x: x.text, info_index.findAll("h3")))

        rows_info = info_index.findAll("div", class_="col-sm-4")

        meta_data = {k: v for k, v in zip(categories, rows_info)}

        algemen = await parse_general_component(meta_data["Algemeen"])
        details = await parse_details_component(meta_data["Details"])
        return {
            "link": link,
            "Algemeen": algemen,
            "Details": details,
        }

    except Exception as e:
        # print(link)
        with open("profile_parser_logs.log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


def normalize(text):
    output = re.findall(r"\w+", text)
    if output:
        return "_".join(output)


async def fetcher(links):
    max_requests_per_second = 100
    total_links = len(links)
    completed_links = 0
    with alive_bar(total_links) as bar:
        # while completed_links < total_links:
        # a = time.time()
        # print(
        #     f"Executing range {completed_links} - {completed_links + max_requests_per_second}"
        # )
        data = await asyncio.gather(
            *[
                parse_profile_page_info(url.strip(), progress=bar)
                for url in links
            ]
        )

        with open("details_page.xml", "a") as f:
            for info in data:
                if not info:
                    continue
                f.write("<item>\n")
                for k, v in info.items():
                    if isinstance(v, dict):
                        for k1, v1 in v.items():
                            k1 = normalize(k1)
                            if not isinstance(v1, dict):
                                f.write(f"<{k1}>{v1}</{k1}>\n")
                            else:
                                for k2, v2 in v1.items():
                                    k2 = normalize(k2)
                                    if not isinstance(v2, list):
                                        f.write(f"<{k2}>{v2}</{k2}>\n")
                                    else:
                                        for i in v2:
                                            f.write(f"<{k2}>{i}</{k2}>\n")
                    else:
                        f.write(f"<link>{v}</link>\n")
                f.write("</item>\n\n")

            # completed_links += max_requests_per_second
            # print(time.time() - a)
    await client.aclose()


if __name__ == "__main__":
    with open("links.txt", "r") as f:
        asyncio.run(fetcher(links=f.readlines()[1:10]))

        # asyncio.run(fetcher(links=["https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden/bosn19srg77g/goedlopend-kleinschalig-fietsverhuurbedrijf-te-koop-aangeboden-in-amsterdam"]))
