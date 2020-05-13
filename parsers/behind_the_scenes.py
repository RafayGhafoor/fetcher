import httpx
import bs4
import asyncio
from utils import prettify
from alive_progress import alive_bar

client = httpx.AsyncClient(timeout=300)
page_prefix = "achter-de-schermen"


async def parse_behind_the_scenes(link, progress):
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
        with open(__file__ + ".log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


async def main(links):
    total_links = len(links)
    with alive_bar(total_links) as bar:
        data = await asyncio.gather(
            *[parse_behind_the_scenes(url.strip(), progress=bar) for url in links]
        )
        for info in data:
            if not info:
                continue
            folder_name = links[link_num].split('/')[-1]
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)
            
            os.chdir(folder_name)
            
            with open("03 - " + __file__.replace(".py", ".xml"), "w") as f:
                f.write(info)
            os.chdir('..')


if __name__ == "__main__":
    with open("links.txt", "r") as f:
        asyncio.run(main(f.readlines()))
