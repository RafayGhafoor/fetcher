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
        pass


async def main():
    link = "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden/bosn14js154a/kleinschalig-universeel-garagebedrijf-te-koop-aangeboden"
    info = await parse_extra_information(link)
    with open("06 - " + __file__.replace(".py", ".xml"), "w") as f:
        f.write(info)


if __name__ == "__main__":
    asyncio.run(main())
