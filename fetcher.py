"""Fetches all the link to webpages on the website."""
import httpx
import math
import bs4
import asyncio
import sys
import time
import re

listing_url = "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden"

page_categories = (
    "cijfers",
    "achter-de-schermen",
    "sterke-punten",
    "kansen",
    "extra-informatie",
)


def get_total_pages_count():
    soup = bs4.BeautifulSoup(
        httpx.get(
            "https://www.bedrijfsovernameregister.nl/bedrijven-te-koop-aangeboden"
        ).content,
        "lxml",
    )
    pages_count = soup.find("div", attrs={"id": "paginat"}).findAll("span")[-1].text
    partitioner = pages_count.split("totaal")
    if not partitioner:
        sys.exit("Some error occurred while finding total pages count.")
    page_pattern = re.search(r"\d+", partitioner[1])
    if page_pattern:
        return math.ceil(int(page_pattern.group()) / 10)


def get_urls_links():
    urls = [f"{listing_url}/page-{i}" for i in range(2, get_total_pages_count())]
    urls.insert(0, listing_url)
    return urls


async def get_page_urls(url):
    async with httpx.AsyncClient() as client:
        resp = await client.get(url, timeout=30)
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        return list(
            map(
                lambda x: x.a.get("href"),
                soup.findAll("div", class_="thumb-block click-area"),
            )
        )


async def get_all_pages():
    content_urls = await asyncio.gather(
        *[get_page_urls(url) for url in get_urls_links()]
    )
    with open("links.txt", "a") as f:
        for meta_data in content_urls:
            print(".", end="")
            if meta_data:
                for links in meta_data:
                    print(links)
                    f.write(links + "\n")


if __name__ == "__main__":
    a = time.time()
    asyncio.run(get_all_pages())
    print(time.time() - a)
