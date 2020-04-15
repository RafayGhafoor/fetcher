import httpx
import bs4
import asyncio

client = httpx.AsyncClient(timeout=300)
page_prefix = "extra-informatie"


async def parse_extra_information(link):
    try:
        resp = await client.get(f"{link}/{page_prefix}.html")
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        print(soup.find("p", class_="lead").text.strip())

    except Exception as e:
        pass


async def main():
    link = "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden/bosn14js154a/kleinschalig-universeel-garagebedrijf-te-koop-aangeboden"
    await parse_extra_information(link)


if __name__ == "__main__":
    asyncio.run(main())
