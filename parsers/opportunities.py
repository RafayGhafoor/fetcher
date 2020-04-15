import httpx
import bs4
import asyncio
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
        pass


async def main():
    link = "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden/bosn14js154a/kleinschalig-universeel-garagebedrijf-te-koop-aangeboden"
    info = await parse_opportunities(link)
    with open("05 - " + __file__.replace(".py", ".xml"), "w") as f:
        f.write(info)


if __name__ == "__main__":
    asyncio.run(main())
