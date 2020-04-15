import httpx
import bs4
import asyncio

client = httpx.AsyncClient(timeout=300)
page_prefix = "sterke-punten"


async def parse_strengths(link):
    try:
        resp = await client.get(f"{link}/{page_prefix}.html")
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        for i in [
            i.text.strip() for i in soup.findAll("div", class_="strength")
        ]:
            print(i)
        for i in [
            i.text.strip() for i in soup.findAll("div", class_="weakness")
        ]:
            print(i)

    except Exception as e:
        pass


async def main():
    link = "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden/bosn14js154a/kleinschalig-universeel-garagebedrijf-te-koop-aangeboden"
    await parse_strengths(link)


if __name__ == "__main__":
    asyncio.run(main())
