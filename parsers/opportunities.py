import httpx
import os
import bs4
import asyncio
from alive_progress import alive_bar
from utils import newlines_to_sentences, prettify

client = httpx.AsyncClient(timeout=300)
page_prefix = "kansen"


async def parse_opportunities(link):
    try:
        resp = await client.get(f"{link}/{page_prefix}.html")
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        xml_data = ""
        for i in [
            newlines_to_sentences(i.text.strip())
            for i in soup.findAll("div", class_="opportunity")
        ]:
            if not i:
                continue
            xml_data += f"<opportunity>{i}</opportunity>"

        return prettify(f"{xml_data}", "opportunities")

    except Exception as e:
        with open(__file__ + ".log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


async def main(links):
    total_links = len(links)
    with alive_bar(total_links) as bar:
        data = await asyncio.gather(
            *[parse_opportunities(url.strip(), progress=bar) for url in links]
        )
        for link_num, info in enumerate(data):
            if not info:
                continue
            folder_name = links[link_num].split("/")[-1]
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)

            os.chdir(folder_name)

            with open("05 - " + __file__.replace(".py", ".xml"), "w") as f:
                f.write(info)
            os.chdir("..")


if __name__ == "__main__":
    with open("links.txt", "r") as f:
        asyncio.run(main(f.readlines()))
