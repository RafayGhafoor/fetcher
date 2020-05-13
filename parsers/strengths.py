from alive_progress import alive_bar
import os
import httpx
import bs4
import asyncio
from utils import newlines_to_sentences, prettify

client = httpx.AsyncClient(timeout=300)
page_prefix = "sterke-punten"


async def parse_strengths(link, progress):
    try:
        resp = await client.get(f"{link}/{page_prefix}.html")
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        strengths = ""
        weaknesses = ""
        for i in [i.text.strip() for i in soup.findAll("div", class_="strength")]:
            i = newlines_to_sentences(i)
            if not i:
                continue
            strengths += f"<strength>{i}</strength>"
        for i in [i.text.strip() for i in soup.findAll("div", class_="weakness")]:
            if not i:
                continue
            weaknesses += f"<weakness>{i}</weakness>"
        xml_data = f"<strength_info>{strengths}</strength_info><weakness_info>{weaknesses}</weakness_info>"
        return prettify(xml_data, "strength")

    except Exception as e:
        with open(__file__ + ".log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


async def main(links):
    total_links = len(links)
    with alive_bar(total_links) as bar:
        data = await asyncio.gather(
            *[parse_strengths(url.strip(), progress=bar) for url in links]
        )
        for link_num, info in enumerate(data):
            if not info:
                continue
            folder_name = links[link_num].split("/")[-1]
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)

            os.chdir(folder_name)

            with open("04 - " + __file__.replace(".py", ".xml"), "w") as f:
                f.write(info)
            os.chdir("..")


if __name__ == "__main__":
    with open("links.txt", "r") as f:
        asyncio.run(main(f.readlines()))
