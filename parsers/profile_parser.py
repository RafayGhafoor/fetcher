"""
    Parser for profile page components.
    
    Profile page is composed of three components 
    i.e., Algemeen (General), Details, Extra informatie (Extra Information)
"""
import time
import httpx
import bs4
import asyncio


def parse_general_component(html_page):
    info = {}
    general_component_info = html_page.findAll("div", class_="row")

    for tags in general_component_info:
        heading, value = list(map(lambda x: x.strip(), tags.text.split(":")))
        info[heading] = value

    return info


def parse_details_component(html_page):
    description = html_page.find("p").text.strip().split("\n")[0]

    headings_info = {}

    for i in html_page.findAll("b"):
        headings_info[i.text.strip()] = i.next_sibling.strip()

    preferred_buyers = {
        html_page.find("strong").text.strip(): [
            i.next_sibling.strip() for i in html_page.findAll("i")
        ]
    }

    return {
        "description": description,
        "headings_info": headings_info,
        "preferred_buyers": preferred_buyers,
    }


async def parse_profile_page_info(link):
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.get(link, timeout=30)

            soup = bs4.BeautifulSoup(resp.content, "lxml")

            info_index = soup.find(
                "div", attrs={"id": "profiel"}, class_="profile-columns"
            )

            categories = list(map(lambda x: x.text, info_index.findAll("h3")))

            rows_info = info_index.findAll("div", class_="col-sm-4")

            meta_data = {k: v for k, v in zip(categories, rows_info)}

            return {
                "Algemeen": parse_general_component(meta_data["Algemeen"]),
                "Details": parse_details_component(meta_data["Details"]),
            }

    except:
        with open("profile_parser_logs.log", "a") as f:
            f.write(link + "\n")


async def fetcher(links):
    info = await asyncio.gather(
        *[parse_profile_page_info(url.strip()) for url in links]
    )


if __name__ == "__main__":
    with open("links.txt", "r") as f:
        a = time.time()
        asyncio.run(fetcher(links=f.readlines()[1:100]))
        print(time.time() - a)
