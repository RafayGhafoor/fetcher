import httpx
import bs4
import asyncio
import os

os.chdir("parsers")


client = httpx.AsyncClient(timeout=300)
page_prefix = "achter-de-schermen"


async def parse_behind_the_scenes(link):
    try:
        # resp = await client.get(f"{link}/{page_prefix}.html")
        # soup = bs4.BeautifulSoup(resp.content, "lxml")
        with open("bts.html", "r") as f:
            soup = bs4.BeautifulSoup(f.read(), "lxml")

            rows_info = soup.findAll("div", class_="row")
            for row_info in rows_info:
                right_text = row_info.find(
                    "div", class_="col-md-5 col-sm-12 text-right"
                ).text.strip()
                left_text = row_info.find(
                    "div", class_="col-md-5 col-sm-12 text-left"
                ).text.strip()
                left_value = int(row_info.input.get("data-slider-value"))
                right_value = 100 - left_value
                left_value, right_value = left_value / 10, right_value / 10
                print(
                    f"{left_text}:{left_value} || {right_text}:{right_value}"
                )

    except Exception as e:
        print(e)
        pass


async def main():
    link = "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden/bosn14js154a/kleinschalig-universeel-garagebedrijf-te-koop-aangeboden"
    await parse_behind_the_scenes(link)


if __name__ == "__main__":
    asyncio.run(main())
