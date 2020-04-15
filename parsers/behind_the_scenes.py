import httpx
import bs4
import asyncio
from utils import prettify


client = httpx.AsyncClient(timeout=300)
page_prefix = "achter-de-schermen"


async def parse_behind_the_scenes(link):
    try:
        resp = await client.get(f"{link}/{page_prefix}.html")
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        rows_info = soup.findAll("div", class_="row")
        xml_data = ""
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
            left_xml = (
                f"<description>{left_text}</description><value>{left_value}</value>"
            )
            right_xml = f"<description>{right_text}</description><value>{right_value}</value></stat>"
            xml_data += "<stat>"
            xml_data += left_xml
            xml_data += right_xml
            xml_data += "</stat>"
        return prettify(f"{xml_data}", "behind_the_scenes")

    except Exception as e:
        print(e)
        pass


async def main():
    link = "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden/bosn14js154a/kleinschalig-universeel-garagebedrijf-te-koop-aangeboden"
    info = await parse_behind_the_scenes(link)
    with open("03 - " + __file__.replace(".py", ".xml"), "w") as f:
        f.write(info)


if __name__ == "__main__":
    asyncio.run(main())
