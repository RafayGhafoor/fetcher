import httpx
import bs4
import asyncio
from utils import newlines_to_sentences, prettify

client = httpx.AsyncClient(timeout=300)
page_prefix = "sterke-punten"


async def parse_strengths(link):
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
        raise


async def main():
    link = "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden/bosn14js154a/kleinschalig-universeel-garagebedrijf-te-koop-aangeboden"
    info = await parse_strengths(link)
    with open("04 - " + __file__.replace(".py", ".xml"), "w") as f:
        f.write(info)


if __name__ == "__main__":
    asyncio.run(main())
