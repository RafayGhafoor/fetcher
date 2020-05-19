from alive_progress import alive_bar
import httpx
import os
import bs4
import asyncio
import re
from utils import normalize_text, newlines_to_sentences, prettify

client = httpx.AsyncClient(timeout=300)

# ** Profile Parser **


async def parse_general_component(html_content):
    info = {}
    general_component_info = html_content.findAll("div", class_="row")

    for tags in general_component_info:
        heading, value = list(map(lambda x: x.strip(), tags.text.split(":")))
        info[heading] = value

    return info


async def parse_details_component(html_content):
    description = html_content.find("p").text.strip().split("\n")[0]

    headings_info = {}

    for i in html_content.findAll("b"):
        headings_info[i.text.strip()] = i.next_sibling.strip()

    preferred_buyers = {
        html_content.find("strong").text.strip(): [
            i.next_sibling.strip() for i in html_content.findAll("i")
        ]
    }

    return {
        "description": description,
        "headings_info": headings_info,
        "preferred_buyers": preferred_buyers,
    }


async def parse_profile_page_info(link, progress):
    try:
        resp = await client.get(link)

        soup = bs4.BeautifulSoup(resp.content, "lxml")

        info_index = soup.find(
            "div", attrs={"id": "profiel"}, class_="profile-columns"
        )

        categories = list(map(lambda x: x.text, info_index.findAll("h3")))

        rows_info = info_index.findAll("div", class_="col-sm-4")

        meta_data = {k: v for k, v in zip(categories, rows_info)}

        algemen = await parse_general_component(meta_data["Algemeen"])
        details = await parse_details_component(meta_data["Details"])
        return {
            "link": link,
            "Algemeen": algemen,
            "Details": details,
        }

    except Exception as e:
        # print(link)
        with open("profile_parser_logs.log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


# ** Profile Parser **


async def fetcher_profile(links):
    total_links = len(links)
    with alive_bar(total_links) as bar:
        data = await asyncio.gather(
            *[parse_profile_page_info(url.strip(), progress=bar) for url in links]
        )

        for link_num, info in enumerate(data):
            if not info:
                continue
            folder_name = links[link_num].split("/")[-1]

            if not os.path.exists(folder_name):
                os.makedirs(folder_name)

            os.chdir(folder_name)

            with open("01 - details_page.xml", "a") as f:
                f.write("<item>\n")
                for k, v in info.items():
                    if isinstance(v, dict):
                        for k1, v1 in v.items():
                            k1 = normalize_text(k1)
                            if not isinstance(v1, dict):
                                f.write(f"<{k1}>{v1}</{k1}>\n")
                            else:
                                for k2, v2 in v1.items():
                                    k2 = normalize_text(k2)
                                    if not isinstance(v2, list):
                                        f.write(f"<{k2}>{v2}</{k2}>\n")
                                    else:
                                        for i in v2:
                                            f.write(f"<{k2}>{i}</{k2}>\n")
                    else:
                        f.write(f"<link>{v}</link>\n")
                f.write("</item>\n\n")
            os.chdir("..")

    await client.aclose()


# ** Extra Information **


async def parse_extra_information(link, progress):
    try:
        resp = await client.get(f"{link}/extra-informatie.html")
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        text = soup.find("p", class_="lead").text.strip()
        text = newlines_to_sentences(text)
        return prettify(f"{text}", "extra_information")

    except Exception as e:
        with open("extra_information.log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


# ** Extra Information **

# ** Opportunities **


async def parse_opportunities(link, progress):
    try:
        resp = await client.get(f"{link}/kansen.html")
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
        with open("opportunities.log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


# ** Opportunities **

# ** Numbers **


async def parse_details_component(html_content):
    meta_data = {}
    for i in html_content.findAll("div", class_="form-group"):
        key = i.find("strong").text.strip()
        meta_data[key] = {}
        keys = i.findAll("div", class_="col-xs-7")
        values = i.findAll("div", class_="col-xs-5")
        for k, v in zip(keys, values):
            k, v = k.text.strip(), v.text.strip()
            meta_data[key][k] = v
    text = ""
    for k, v in meta_data.items():
        k = normalize_text(k)
        text += f"<{k}>"
        for k1, v1 in v.items():
            k1 = normalize_text(k1)
            text += f"<{k1}>{v1}</{k1}>"
        text += f"</{k}>"

    return prettify(text, "details")


async def parse_facts_component(html_content):
    meta_data = {}
    elem = html_content.find("ol", class_="chart")

    meta_data[html_content.find("strong").text.strip()] = [
        i.text.strip() for i in elem.findAll("li")
    ]

    elem_2 = html_content.findAll("div", class_="form-group")[1]

    meta_data[elem_2.find("strong").text.strip()] = [
        i.text.strip() for i in elem_2.findAll("li")
    ]

    text = ""
    for k, v in meta_data.items():
        k = normalize_text(k)
        text += f"<{k}>"
        for i in v:
            if not i:
                continue
            text += "<value>"
            text += f"{i}"
            text += "</value>"
        text += f"</{k}>"

    return prettify(text, "facts")


async def parse_short_term_improvements_component(html_content):
    heading = "short_term_improvements"
    xml_data = newlines_to_sentences(html_content.text.strip())
    return prettify(f"<{heading}>{xml_data}</{heading}>", "short_term_improvements")


async def parse_numbers_page(link, progress):
    try:
        resp = await client.get(f"{link}/cijfers.html")
        soup = bs4.BeautifulSoup(resp.content, "lxml")
        info_index = soup.find(
            "div", attrs={"id": "cijfers"}, class_="profile-columns"
        )

        categories = list(map(lambda x: x.text.strip(), info_index.findAll("h3")))

        rows_info = info_index.findAll("div", class_="col-sm-4")

        meta_data = {k: v for k, v in zip(categories, rows_info)}

        details_info = await parse_details_component(meta_data["Details"])
        facts_info = await parse_facts_component(meta_data["Feiten"])
        sti_info = await parse_short_term_improvements_component(
            meta_data["Korte termijn verbeteringen"]
        )
        return prettify(f"{details_info}\n{facts_info}\n{sti_info}\n", "numbers")

    except Exception as e:
        print(e)
        with open("numbers.log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


# ** Numbers **

# ** Strengths **


async def parse_strengths(link, progress):
    try:
        resp = await client.get(f"{link}/sterke-punten.html")
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
        with open(__file__ + ".log", "a") as f:
            f.write(link + "\n")

    finally:
        progress()


# ** Strengths **

# ** Behind the Scenes **


async def parse_behind_the_scenes(link, progress):
    try:
        resp = await client.get(f"{link}/achter-de-schermen.html")
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


# ** Behind the Scenes **


async def fetcher(links, parser, index, file_name):
    total_links = len(links)

    with alive_bar(total_links) as bar:
        data = await asyncio.gather(
            *[parser(url.strip(), progress=bar) for url in links]
        )
        for link_num, info in enumerate(data):
            if not info:
                continue
            folder_name = links[link_num].split("/")[-1]
            if not os.path.exists(folder_name):
                os.makedirs(folder_name)

            os.chdir(folder_name)

            with open(f"0{index} - {file_name}.xml", "w") as f:
                f.write(info)
            os.chdir("..")


async def runner(data_folder="data"):

    with open("links.txt", "r") as f:
        if not os.path.exists(data_folder):
            os.makedirs(data_folder)

        os.chdir(data_folder)
        text_stream = f.readlines()

        print(">>> Fetching Profile Page")

        await fetcher_profile(links=text_stream)

        print(">>> Fetching Numbers Page")

        await fetcher(
            links=text_stream,
            parser=parse_numbers_page,
            index=2,
            file_name="Numbers",
        )

        print(">>> Fetching Behind the Scenes Page")

        await fetcher(
            links=text_stream,
            parser=parse_behind_the_scenes,
            index=3,
            file_name="Behind the Scenes",
        )

        print(">>> Fetching Strengths Page")

        await fetcher(
            links=text_stream,
            parser=parse_strengths,
            index=4,
            file_name="Strengths",
        )

        print(">>> Fetching Opportunities Page")

        await fetcher(
            links=text_stream,
            parser=parse_opportunities,
            index=5,
            file_name="Opportunities",
        )

        print(">>> Fetching Extra Information Page")

        await fetcher(
            links=text_stream,
            parser=parse_extra_information,
            index=6,
            file_name="Extra Information",
        )

        text = b""

        for i in os.listdir("."):
            os.chdir(i)

            for page_num, j in enumerate(sorted(os.listdir(".")), 1):
                text += f"<page_num>{page_num}<page_num>\n".encode()
                with open(j, "rb") as f:
                    text += f.read()
                text += b"\n"

            text += b"\n"

            os.chdir("..")

        os.chdir("..")

        with open("data.xml", "wb") as f:
            f.write(text)

        os.rmdir(data_folder)


if __name__ == "__main__":
    asyncio.run(runner())
