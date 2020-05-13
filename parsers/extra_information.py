import httpx
import bs4
import asyncio
from utils import newlines_to_sentences, prettify

client = httpx.AsyncClient(timeout=300)
page_prefix = "extra-informatie"


async def parse_extra_information(link):
    try:
        resp = await client.get(f"{link}/{page_prefix}.html")
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        text = soup.find("p", class_="lead").text.strip()
        text = newlines_to_sentences(text)
        return prettify(f"{text}", "extra_information")

    except Exception as e:
        with open(__file__ + ".log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


async def main(links):
    total_links = len(links)
    with alive_bar(total_links) as bar:
        data = await asyncio.gather(
            *[parse_extra_information(url.strip(), progress=bar) for url in links]
        )
        for info in data:
            if not info:
                continue
            folder_name = links[link_num].split("/")[-1]
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)

            os.chdir(folder_name)

            with open("06 - " + __file__.replace(".py", ".xml"), "w") as f:
                f.write(info)
            os.chdir("..")


if __name__ == "__main__":
    with open("links.txt", "r") as f:
        asyncio.run(main(f.readlines()))
